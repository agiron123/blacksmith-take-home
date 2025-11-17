# syntax=docker/dockerfile:1

FROM oven/bun:1

ARG USERNAME=bun
ARG USER_UID=1000
ARG USER_GID=${USER_UID}

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        git \
        openssh-client \
        sudo \
        unzip \
        vim \
        zsh \
    && rm -rf /var/lib/apt/lists/*

RUN if id "${USERNAME}" >/dev/null 2>&1; then \
        usermod -aG sudo "${USERNAME}"; \
    else \
        groupadd --gid "${USER_GID}" "${USERNAME}" \
        && useradd --uid "${USER_UID}" --gid "${USER_GID}" -m "${USERNAME}" \
        && usermod -aG sudo "${USERNAME}"; \
    fi \
    && echo "%${USERNAME} ALL=(ALL) NOPASSWD:ALL" >/etc/sudoers.d/${USERNAME} \
    && chmod 0440 /etc/sudoers.d/${USERNAME}

WORKDIR /workspace

ENV SHELL=/bin/zsh

CMD ["sleep", "infinity"]
