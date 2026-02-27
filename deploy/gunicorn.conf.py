# Gunicorn configuration for Aitu.kz Django backend
# Optimized for 1GB RAM VPS

import multiprocessing

# Bind to localhost — Nginx handles external connections
bind = "127.0.0.1:8000"

# 2 workers for 1GB RAM (formula: 2 * CPU_cores + 1, but limited by RAM)
workers = 2

# Worker class
worker_class = "sync"

# Timeout (seconds)
timeout = 30
graceful_timeout = 30

# Logging
accesslog = "-"
errorlog = "-"
loglevel = "warning"

# Process name
proc_name = "aitu-backend"

# Max requests before worker restart (prevents memory leaks)
max_requests = 1000
max_requests_jitter = 50
