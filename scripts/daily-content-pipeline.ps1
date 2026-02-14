# Daily Content Pipeline
# Automated social media intelligence gathering and content briefing
# Runs daily at 8:00 AM via Task Scheduler

param(
    [switch]$Test,
    [switch]$SkipScraping,
    [switch]$SkipBriefing
)

# Configuration
$ProjectRoot = "A:\repositories\life-is-tempo"
$LogDir = Join-Path $ProjectRoot "logs"
$Date = Get-Date -Format "yyyy-MM-dd"
$LogFile = Join-Path $LogDir "content-pipeline-$Date.log"

# Ensure log directory exists
if (-not (Test-Path $LogDir)) {
    New-Item -ItemType Directory -Path $LogDir | Out-Null
}

# Logging function
function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogMessage = "[$Timestamp] [$Level] $Message"
    Write-Host $LogMessage
    Add-Content -Path $LogFile -Value $LogMessage
}

# Error handling
$ErrorActionPreference = "Stop"
$script:HasErrors = $false

# Start pipeline
Write-Log "=== Daily Content Pipeline Started ==="
Write-Log "Mode: $(if ($Test) { 'TEST' } else { 'PRODUCTION' })"

# Step 1: Social media scraping
if (-not $SkipScraping) {
    Write-Log "Step 1: Starting social intelligence gathering..."

    try {
        # Run social-scraper skill via Claude CLI
        $ScraperOutput = & claude -p "/social-scraper" 2>&1

        if ($LASTEXITCODE -ne 0) {
            Write-Log "✗ Social scraping FAILED with exit code $LASTEXITCODE" -Level "ERROR"
            Write-Log "Error output: $ScraperOutput" -Level "ERROR"
            $script:HasErrors = $true
            Write-Log "FATAL: Cannot proceed without social scraping data" -Level "ERROR"
            exit 1
        }

        Write-Log "✓ Social scraping completed successfully"
        Write-Log "Output preview: $($ScraperOutput | Select-Object -First 5)"
    } catch {
        Write-Log "✗ Social scraping FATAL exception: $_" -Level "ERROR"
        Write-Log "Stack trace: $($_.ScriptStackTrace)" -Level "ERROR"
        exit 1
    }
} else {
    Write-Log "Step 1: Skipping social scraping (--SkipScraping flag)"
}

# Step 2: Content briefing generation
if (-not $SkipBriefing) {
    Write-Log "Step 2: Generating content briefing..."

    try {
        # Run content-briefing skill via Claude CLI
        $BriefingOutput = & claude -p "/content-briefing" 2>&1

        if ($LASTEXITCODE -ne 0) {
            Write-Log "✗ Content briefing FAILED with exit code $LASTEXITCODE" -Level "ERROR"
            Write-Log "Error output: $BriefingOutput" -Level "ERROR"
            $script:HasErrors = $true
            Write-Log "FATAL: Cannot proceed without content briefing" -Level "ERROR"
            exit 1
        }

        Write-Log "✓ Content briefing generated successfully"
        Write-Log "Output preview: $($BriefingOutput | Select-Object -First 5)"
    } catch {
        Write-Log "✗ Content briefing FATAL exception: $_" -Level "ERROR"
        Write-Log "Stack trace: $($_.ScriptStackTrace)" -Level "ERROR"
        exit 1
    }
} else {
    Write-Log "Step 2: Skipping content briefing (--SkipBriefing flag)"
}

# Step 3: Verify output files
Write-Log "Step 3: Verifying output files..."

$ExpectedFiles = @(
    "content/inspiration/$Date.md",
    "content/analytics/$Date.md",
    "content/briefings/$Date.md"
)

$AllFilesExist = $true
foreach ($File in $ExpectedFiles) {
    $FullPath = Join-Path $ProjectRoot $File

    # Check file exists
    if (-not (Test-Path $FullPath)) {
        Write-Log "✗ CRITICAL: Missing expected file: $File" -Level "ERROR"
        $AllFilesExist = $false
        $script:HasErrors = $true
        continue
    }

    # Check file is not empty
    $FileSize = (Get-Item $FullPath).Length
    if ($FileSize -eq 0) {
        Write-Log "✗ CRITICAL: Empty output file: $File" -Level "ERROR"
        $AllFilesExist = $false
        $script:HasErrors = $true
        continue
    }

    # Check file doesn't contain error messages
    $Content = Get-Content $FullPath -Raw -ErrorAction SilentlyContinue
    if ($Content -match "ERROR|Exception|Failed") {
        Write-Log "✗ CRITICAL: Output file contains errors: $File" -Level "ERROR"
        $AllFilesExist = $false
        $script:HasErrors = $true
        continue
    }

    Write-Log "✓ Found: $File (${FileSize} bytes, valid content)"
}

if ($AllFilesExist) {
    Write-Log "✓ All expected files created and validated"
} else {
    Write-Log "✗ CRITICAL: Pipeline failed - files missing/invalid" -Level "ERROR"
    exit 1
}

# Summary
Write-Log "=== Daily Content Pipeline Completed ==="
Write-Log "Log file: $LogFile"

if ($Test) {
    Write-Log "TEST MODE: Review output in content/ directories"
    Write-Log "Next steps: Review scraped data and briefing, then run /ghostwriter"
}

# Exit with appropriate code
if ($script:HasErrors -or -not $AllFilesExist) {
    Write-Log "Pipeline completed with ERRORS" -Level "ERROR"
    exit 1
} else {
    Write-Log "Pipeline completed successfully"
    exit 0
}
