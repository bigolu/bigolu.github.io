# Display this message
help:
    @just --list --justfile {{ justfile() }} --unsorted

# Start the development server
run-dev-server:
    next dev --port 8000

# Format all of the source code
format:
    treefmt
