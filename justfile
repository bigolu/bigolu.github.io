set shell := ["bash", "-uc"]

# Display this message
help:
    @just --list --justfile {{ justfile() }} --unsorted

# Install git hooks
install-git-hooks:
    lefthook install

reload:
    direnv reload
    nix-direnv-reload

# Start the development server
run-dev-server:
    next dev --port 8000

# Format source code
format:
    treefmt

# Run precommit git hook
run-precommit-hook:
    lefthook run pre-commit
