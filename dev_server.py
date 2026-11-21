#!/usr/bin/env python3
"""Serve this static portfolio locally, including its branded 404 response.

Run from anywhere: python dev_server.py [--port 8000]
This helper is for local testing only; deployment uses its own routing.
"""

import argparse
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


SITE_ROOT = Path(__file__).resolve().parent


class PortfolioHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(SITE_ROOT), **kwargs)

    def end_headers(self):
        # Prevent stale MP3s during local testing when audio is re-trimmed
        # and replaced at the same filename.
        if self.path.partition("?")[0].lower().endswith(".mp3"):
            self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def send_error(self, code, message=None, explain=None):
        if code == HTTPStatus.NOT_FOUND:
            try:
                content = (SITE_ROOT / "404.html").read_bytes()
            except OSError:
                pass
            else:
                self.send_response(HTTPStatus.NOT_FOUND)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(content)))
                self.send_header("Cache-Control", "no-store")
                self.end_headers()
                if self.command != "HEAD":
                    self.wfile.write(content)
                return
        super().send_error(code, message, explain)


def main():
    parser = argparse.ArgumentParser(description="Preview the portfolio with its custom 404 page")
    parser.add_argument("--port", type=int, default=8000, help="Local port (default: 8000)")
    args = parser.parse_args()

    with ThreadingHTTPServer(("127.0.0.1", args.port), PortfolioHandler) as server:
        print(f"Portfolio preview: http://localhost:{server.server_port}/")
        print("Custom 404 test: http://localhost:{}/asdf".format(server.server_port))
        print("Press Ctrl+C to stop.")
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nStopping local preview server.")


if __name__ == "__main__":
    main()
