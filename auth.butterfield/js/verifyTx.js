const etherscanApiKey = "65B8QIP2ABQ7X8FEHQU2S1NUQZQ1AWS447";
let confirmationTimeout = null;

async function confirmHash() {
  console.log("🔁 confirmHash() triggered");

  const txHash = document.getElementById('hashInput').value.trim();
  const method = document.getElementById('paymentMethod').value;
  const statusMsg = document.getElementById('statusMsg');
  const spinner = document.getElementById('spinner');
  const paidBtn = document.getElementById('paidBtn');

  if (!txHash || txHash.length < 30 || !method) {
    alert("Enter a valid transaction hash and method.");
    return;
  }

  // Save hash to localStorage
  localStorage.setItem('lastHash', txHash);

  // UI: Hide button, show spinner, scroll into view
  document.getElementById('hashPopup').style.display = 'none';
  paidBtn.style.display = 'none';
  spinner.style.display = 'block';
  statusMsg.innerHTML = "<div style='opacity:0; animation: fadeIn 1s forwards;'>🔍 Verifying transaction on blockchain...</div>";

  // Scroll to spinner on mobile
  setTimeout(() => {
    document.getElementById('spinner').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 300);

  // 15-second fallback
  clearTimeout(confirmationTimeout);
  confirmationTimeout = setTimeout(() => {
    spinner.style.display = 'none';
    statusMsg.innerHTML = "❌ Timeout: Transaction not confirmed.";
    window.location.href = "failed.html";
  }, 15000);

  try {
    let confirmed = false;

    if (method === 'BTC') {
      const url = `https://blockstream.info/api/tx/${txHash}/status`;
      const res = await fetch(url);
      const data = await res.json();
      confirmed = data.confirmed;
    } else {
      const url = `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${etherscanApiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      confirmed = (data.status === "1" && data.result?.status === "1");
    }

    clearTimeout(confirmationTimeout);
    spinner.style.display = 'none';

    if (confirmed) {
      statusMsg.innerHTML = "<div style='color:green; animation: fadeIn 1s forwards;'>✅ Transaction Confirmed! Redirecting...</div>";
      setTimeout(() => window.location.href = "success.html", 1500);
    } else {
      statusMsg.innerHTML = "<div style='color:red; animation: fadeIn 1s forwards;'>❌ Transaction not confirmed.</div>";
      setTimeout(() => window.location.href = "failed.html", 2000);
    }
  } catch (err) {
    console.error("⚠ Error during blockchain verification:", err);
    clearTimeout(confirmationTimeout);
    spinner.style.display = 'none';
    statusMsg.innerHTML = "<div style='color:orange; animation: fadeIn 1s forwards;'>⚠ Verification failed.</div>";
    setTimeout(() => window.location.href = "failed.html", 2500);
  }
}

// Auto-fill saved hash on popup open
window.addEventListener('DOMContentLoaded', () => {
  const savedHash = localStorage.getItem('lastHash');
  if (savedHash) {
    const hashInput = document.getElementById('hashInput');
    if (hashInput) {
      hashInput.value = savedHash;
      const confirmBtn = document.getElementById('confirmBtn');
      confirmBtn.disabled = savedHash.length < 64;
      confirmBtn.classList.toggle('active', savedHash.length >= 64);
    }
  }
});
