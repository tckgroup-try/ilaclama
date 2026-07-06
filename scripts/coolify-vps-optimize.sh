#!/bin/bash
# ==============================================================================
# TCK İLAÇLAMA - VPS & COOLIFY OPTIMIZATION SCRIPT
# ==============================================================================
# Target: Ubuntu/Debian VPS running Coolify & Next.js builds.
# Goal: Prevent Out-Of-Memory (OOM) crashes, clean up disk space, and optimize Docker.
# ==============================================================================

set -euo pipefail

echo "===================================================="
echo "🚀 VPS & Coolify Optimization Engine Starting..."
echo "===================================================="

# 1. SWAP MEMORY CONFIGURATION (Prevents Next.js build crash due to RAM)
echo "🧠 Step 1: Configuring Swap Memory..."
CURRENT_SWAP=$(free -m | awk '/^Swap:/{print $2}')

if [ "$CURRENT_SWAP" -lt 4000 ]; then
    echo "⚠️ Current Swap is only ${CURRENT_SWAP}MB. Allocating a 4GB swap file..."
    
    # Disable existing swap file if it exists at /swapfile
    if [ -f /swapfile ]; then
        swapoff /swapfile || true
        rm -f /swapfile
    fi
    
    fallocate -l 4G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=4096
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    
    # Make swap persistent
    if ! grep -q "/swapfile" /etc/fstab; then
        echo '/swapfile none swap sw 0 0' >> /etc/fstab
    fi
    echo "✅ 4GB Swap successfully configured and activated."
else
    echo "✅ Sufficient Swap already configured (${CURRENT_SWAP}MB)."
fi

# Optimize Swappiness (Use swap only when physical memory is nearly full)
sysctl vm.swappiness=10
if ! grep -q "vm.swappiness" /etc/sysctl.conf; then
    echo "vm.swappiness=10" >> /etc/sysctl.conf
fi

# 2. DOCKER RESOURCE OPTIMIZATION
echo "🐳 Step 2: Optimizing Docker & Reclaiming Disk Space..."
# Remove dangling images, build caches, and unused networks/containers
docker system prune -af --volumes

# Create a weekly cron job to auto-clean Docker build caches (prevent disk-full crash)
CRON_FILE="/etc/cron.weekly/coolify-docker-cleanup"
cat << 'EOF' > "$CRON_FILE"
#!/bin/bash
# Auto-prune Docker caches once a week to prevent VPS disk fill-up
docker system prune -af --volumes --filter "until=168h"
EOF
chmod +x "$CRON_FILE"
echo "✅ Weekly Docker cleanup cron job created at $CRON_FILE."

# 3. KERNEL & SOCKET LIMITS OPTIMIZATION
echo "⚙️ Step 3: Tuning Linux Kernel Limits for High Traffic..."
cat << 'EOF' > /etc/sysctl.d/99-coolify-optimize.conf
# Max open files limit
fs.file-max = 2097152

# TCP socket buffer sizes
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.ipv4.tcp_rmem = 4096 87380 16777216
net.ipv4.tcp_wmem = 4096 65536 16777216

# Increase TCP connection backlog limit
net.core.somaxconn = 8192
net.ipv4.tcp_max_syn_backlog = 8192
net.ipv4.tcp_fin_timeout = 15
net.ipv4.tcp_tw_reuse = 1
EOF

sysctl --system || true
echo "✅ Kernel limits optimized."

echo "===================================================="
echo "🎉 VPS & Coolify Optimization Completed Successfully!"
echo "💡 Now, go to your Coolify UI, open your Project Settings,"
echo "   and hit 'Redeploy' to build the newest version."
echo "===================================================="
