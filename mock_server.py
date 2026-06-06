import http.server
import json

class MockAIHandler(http.server.BaseHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            data = json.loads(post_data.decode('utf-8'))
            print("\n================== PAYLOAD RECIBIDO ==================")
            print(json.dumps(data, indent=2, ensure_ascii=False))
            print("======================================================\n")
            
            # Comprobar si es formato Ollama o formato estándar
            if "prompt" in data:
                # Formato Ollama
                response_text = f"[Mock Ollama] Procesado correctamente el prompt unificado.\n\nModelo utilizado: {data.get('model', 'desconocido')}\n\nRespuesta simulada:\nEntendido. He analizado la página y tu pregunta es procesada con éxito por el modelo local."
                response_data = {"response": response_text}
                response_bytes = json.dumps(response_data, ensure_ascii=False).encode('utf-8')
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(response_bytes)
            else:
                # Formato estructurado Clawky/Hermes/Antigravity
                user_prompt = data.get("user_prompt", "")
                page = data.get("page", {})
                page_title = page.get("title", "Desconocido")
                page_url = page.get("url", "")
                
                response_text = (
                  f"[Mock Server] ¡Conexión exitosa!\n"
                  f"Recibido análisis de la página: '{page_title}'\n"
                  f"URL: {page_url}\n"
                  f"Tu pregunta fue: '{user_prompt}'\n\n"
                  f"Capa de eventos verificada: OK"
                )
                
                self.send_response(200)
                self.send_header('Content-Type', 'text/plain; charset=utf-8')
                self.end_headers()
                self.wfile.write(response_text.encode('utf-8'))
                
        except Exception as e:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(f"Error procesando JSON: {str(e)}".encode('utf-8'))

def run(port=18789):
    server_address = ('', port)
    httpd = http.server.HTTPServer(server_address, MockAIHandler)
    print(f"Iniciando servidor de pruebas en http://localhost:{port}")
    print("Soporta CORS y acepta peticiones POST de la extensión.")
    print("Presiona Ctrl+C para detener el servidor.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
        httpd.server_close()

if __name__ == '__main__':
    run()
