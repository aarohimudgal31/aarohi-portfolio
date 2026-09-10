import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Disable caching for local development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run_server():
    os.chdir(DIRECTORY)
    # Attempt on PORT, or find next available port
    global PORT
    for p in range(PORT, PORT + 20):
        try:
            with socketserver.TCPServer(("127.0.0.1", p), Handler) as httpd:
                print(f"Server successfully started at: http://127.0.0.1:{p}", flush=True)
                print("Press Ctrl+C to stop the server.", flush=True)
                # Automatically open in browser
                webbrowser.open(f"http://127.0.0.1:{p}")
                httpd.serve_forever()
                break
        except OSError as e:
            if "Address already in use" in str(e) or e.errno == 10048:
                print(f"Port {p} in use, trying next port...", flush=True)
                continue
            else:
                raise e

if __name__ == "__main__":
    run_server()
