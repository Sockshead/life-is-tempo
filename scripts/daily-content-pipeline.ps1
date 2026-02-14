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
$ErrorActionPreference = "Continue"
trap {
    Write-Log "ERROR: $_" -Level "ERROR"
    Write-Log "Stack trace: $($_.ScriptStackTrace)" -Level "ERROR"
    continue
}

# Start pipeline
Write-Log "=== Daily Content Pipeline Started ==="
Write-Log "Mode: $(if ($Test) { 'TEST' } else { 'PRODUCTION' })"

# Step 1: Social media scraping
if (-not $SkipScraping) {
    Write-Log "Step 1: Starting social intelligence gathering..."

    try {
        # Run social-scraper skill via Claude CLI
        $ScraperOutput = & claude --headless -p "/social-scraper" 2>&1

        if ($LASTEXITCODE -eq 0) {
            Write-Log "✓ Social scraping completed successfully"
            Write-Log "Output preview: $($ScraperOutput | Select-Object -First 5)"
        } else {
            Write-Log "✗ Social scraping failed with exit code $LASTEXITCODE" -Level "ERROR"
            Write-Log "Error output: $ScraperOutput" -Level "ERROR"
        }
    } catch {
        Write-Log "✗ Social scraping exception: $_" -Level "ERROR"
    }
} else {
    Write-Log "Step 1: Skipping social scraping (--SkipScraping flag)"
}

# Step 2: Content briefing generation
if (-not $SkipBriefing) {
    Write-Log "Step 2: Generating content briefing..."

    try {
        # Run content-briefing skill via Claude CLI
        $BriefingOutput = & claude --headless -p "/content-briefing" 2>&1

        if ($LASTEXITCODE -eq 0) {
            Write-Log "✓ Content briefing generated successfully"
            Write-Log "Output preview: $($BriefingOutput | Select-Object -First 5)"
        } else {
            Write-Log "✗ Content briefing failed with exit code $LASTEXITCODE" -Level "ERROR"
            Write-Log "Error output: $BriefingOutput" -Level "ERROR"
        }
    } catch {
        Write-Log "✗ Content briefing exception: $_" -Level "ERROR"
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
    if (Test-Path $FullPath) {
        $FileSize = (Get-Item $FullPath).Length
        Write-Log "✓ Found: $File (${FileSize} bytes)"
    } else {
        Write-Log "✗ Missing: $File" -Level "WARN"
        $AllFilesExist = $false
    }
}

if ($AllFilesExist) {
    Write-Log "✓ All expected files created"
} else {
    Write-Log "⚠ Some expected files are missing" -Level "WARN"
}

# Summary
Write-Log "=== Daily Content Pipeline Completed ==="
Write-Log "Log file: $LogFile"

if ($Test) {
    Write-Log "TEST MODE: Review output in content/ directories"
    Write-Log "Next steps: Review scraped data and briefing, then run /ghostwriter"
}

# Exit with appropriate code
if ($AllFilesExist) {
    exit 0
} else {
    exit 1
}
