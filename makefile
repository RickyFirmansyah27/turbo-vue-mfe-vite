db-server:
	@echo "Starting database server..."
	@echo "Visit: http://localhost:8000"
	@npx json-server --watch db.json --port 8000

clean-mf:
	@echo "Cleaning .__mf__temp folders in apps/* ..."
	@find apps -type d -name '.__mf__temp' -exec rm -rf {} +
	@echo "✅ Done cleaning .__mf__temp folders."
