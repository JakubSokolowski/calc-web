FROM rust:latest

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - \
    && apt-get install -y nodejs && npm install codecov -g

ENV APT_CACHE_DIR = "apt-cache"

RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh \
 && rustup update && rustup toolchain install nightly \
 && rustup target add wasm32-unknown-unknown --toolchain nightly \
 && mkdir -pv $APT_CACHE_DIR && apt-get -qq update \
 && apt-get -qq -o dir::cache::archives="$APT_CACHE_DIR" install -y firefox-esr


CMD ["/bin/bash"]
