function $(id){return document.getElementById(id);}

const stepVerify = $("step-verify");
const stepPackages = $("step-packages");
const stepPayment = $("step-payment");
const stepInvoice = $("step-invoice");

let selectedPack = null;
let amount = null;
let playerId = null;

function isNumeric(str){return /^\d+$/.test(str);}

window.addEventListener("DOMContentLoaded", () => {
  $("btnVerify").addEventListener("click", () => {
    const id = $("playerId").value.trim();
    if(!id || !isNumeric(id) || id.length < 8){
      $("verifyMsg").textContent = "❌ Please enter a valid numeric ID (8+ digits).";
      $("verifyMsg").style.color = "#ff5c5c";
      stepPackages.classList.add("hidden");
      stepPayment.classList.add("hidden");
      stepInvoice.classList.add("hidden");
      return;
    }
    playerId = id;
    $("verifyMsg").textContent = "✅ ID verified (demo).";
    $("verifyMsg").style.color = "#2ecc71";
    stepPackages.classList.remove("hidden");
    stepPayment.classList.add("hidden");
    stepInvoice.classList.add("hidden");
  });

  // Package buttons
  document.querySelectorAll(".pkg").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedPack = btn.dataset.pack;
      amount = btn.dataset.amt;
      $("selPack").textContent = selectedPack;
      $("selAmt").textContent = amount;
      stepPayment.classList.remove("hidden");
      stepInvoice.classList.add("hidden");
      $("payMsg").textContent = "";
    });
  });

  $("btnInvoice").addEventListener("click", () => {
    const txn = $("txnId").value.trim();
    if(!txn){
      $("payMsg").textContent = "❌ Enter a demo transaction / reference ID to continue.";
    } else {
      $("payMsg").textContent = "";
      // fill invoice
      const now = new Date();
      $("invDate").textContent = now.toLocaleString();
      $("invNo").textContent = "INV-" + now.getFullYear().toString().slice(-2) + (now.getMonth()+1).toString().padStart(2,"0") + now.getDate().toString().padStart(2,"0") + "-" + Math.floor(Math.random()*9000+1000);
      $("invPlayer").textContent = playerId || "—";
      $("invPack").textContent = selectedPack || "—";
      $("invAmt").textContent = amount || "—";
      $("invTxn").textContent = txn;
      stepInvoice.classList.remove("hidden");
      window.scrollTo({top: document.body.scrollHeight, behavior:"smooth"});
    }
  });

  $("btnPrint").addEventListener("click", () => {
    window.print();
  });
});
