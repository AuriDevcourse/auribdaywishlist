interface SpreadsheetEmbedProps {
  spreadsheetId: string
  className?: string
}

export function SpreadsheetEmbed({ spreadsheetId, className = '' }: SpreadsheetEmbedProps) {
  const embedUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit?rm=minimal&widget=true&chrome=false`
  const directUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit?usp=sharing`

  return (
    <div className={`w-full ${className}`}>
      <iframe
        src={embedUrl}
        className="w-full h-[600px] border-2 border-gray-300 rounded-lg shadow-lg pointer-events-auto"
        title="Google Spreadsheet"
        allow="fullscreen"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
      <div className="mt-4 text-center">
        <a 
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-gray-600 underline font-medium"
        >
          Direct link
        </a>
      </div>
    </div>
  )
}
