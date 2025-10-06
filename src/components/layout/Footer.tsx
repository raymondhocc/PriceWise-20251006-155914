export function Footer() {
  return (
    <footer className="border-t bg-background/50 py-4">
      <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
        <p className="mb-2">
          <strong>Important Note:</strong> AI-powered scraping and analysis features require configuration of your own API keys in the Cloudflare Worker environment. This application will not function as intended without them.
        </p>
        <p>Built with ❤️ at Cloudflare</p>
      </div>
    </footer>
  );
}