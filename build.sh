#!/usr/bin/env bash

#------------------------------------------------------------------------------
# @file
# Builds the amansanoj/portfolio Hugo project hosted on a Cloudflare Worker.
#------------------------------------------------------------------------------

# Exit on error, undefined variables, or pipe failures
set -euo pipefail

# Set the build cache directory
HUGO_CACHEDIR="${PWD}/.cache/hugo"

# Perform cleanup
cleanup() {
  if [[ -n "${build_temp_dir:-}" && -d "${build_temp_dir}" ]]; then
    rm -rf "${build_temp_dir}"
  fi
}

# Register the cleanup trap
trap cleanup EXIT SIGINT SIGTERM

main() {
  # Export the build cache directory
  export HUGO_CACHEDIR

  # Configure Git
  echo "Configuring Git..."
  git config --global core.quotepath false

  # Fetch full Git history
  if [[ $(git rev-parse --is-shallow-repository) == true ]]; then
    echo "Fetching full Git history..."
    git fetch --unshallow
  fi

  # Initialize Git submodules (only relevant if the theme is ever vendored as a submodule)
  if [[ -f .gitmodules ]]; then
    echo "Initializing Git submodules..."
    git submodule update --init --recursive
  fi

  # Log tool versions
  echo "Logging tool versions..."
  command -v hugo &> /dev/null && echo "Hugo: $(hugo version)" || echo "Hugo: not installed"

  # Build the project
  echo "Building the project..."
  hugo --gc --minify
}

main "$@"
