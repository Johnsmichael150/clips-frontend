"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader2, Wallet, LogOut, AlertCircle, X, CheckCircle2, ExternalLink, Copy, Check } from "lucide-react";
import { useWallet, truncateAddress } from "./WalletProvider";

interface WalletConnectButtonProps {
  /** Compact mode renders a smaller pill button (e.g. for headers/navbars) */
  compact?: boolean;
}

/** Detects whether MetaMask is installed in the browser */
function isMetaMaskInstalled(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(window.ethereum?.isMetaMask);
}

export default function WalletConnectButton({ compact = false }: WalletConnectButtonProps) {
  const { isConnected, isConnecting, address, error, connectMetaMask, disconnect, clearError } =
    useWallet();

  // Flash a "just connected" success state for 2 seconds after connecting
  const [justConnected, setJustConnected] = useState(false);
  const prevConnected = useRef(false);

  // Copy-to-clipboard state
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!prevConnected.current && isConnected) {
      setJustConnected(true);
      const t = setTimeout(() => setJustConnected(false), 2000);
      return () => clearTimeout(t);
    }
    prevConnected.current = isConnected;
  }, [isConnected]);

  const handleCopyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const metaMaskInstalled = isMetaMaskInstalled();

  // ─── Compact variant (header / navbar) ───────────────────────────────────
  if (compact) {
    return (
      <div className="relative flex flex-col items-end gap-2">
        {isConnected && address ? (
          <div className="flex items-center gap-2 animate-in fade-in zoom-in-95 duration-300">
            {/* Success flash overlay */}
            {justConnected && (
              <div className="absolute inset-0 rounded-xl bg-brand/20 animate-ping-once pointer-events-none" />
            )}

            {/* Address pill */}
            <button
              onClick={handleCopyAddress}
              title={copied ? "Copied!" : "Copy address"}
              className="group flex items-center gap-2 bg-brand/10 border border-brand/20 rounded-xl px-3 py-2 hover:bg-brand/20 transition-all active:scale-[0.97]"
            >
              {justConnected ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-brand animate-in zoom-in duration-300" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-brand shadow-[0_0_6px_rgba(0,229,143,0.8)]" />
              )}
              <span className="text-[12px] font-mono font-bold text-brand">
                {truncateAddress(address)}
              </span>
              {copied ? (
                <Check className="w-3 h-3 text-brand" />
              ) : (
                <Copy className="w-3 h-3 text-brand/40 group-hover:text-brand transition-colors" />
              )}
            </button>

            {/* Disconnect */}
            <button
              onClick={disconnect}
              title="Disconnect wallet"
              aria-label="Disconnect wallet"
              className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-muted-foreground hover:text-red-400 hover:border-red-400/20 transition-all"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={metaMaskInstalled ? connectMetaMask : undefined}
            disabled={isConnecting}
            aria-label="Connect MetaMask wallet"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand/10 border border-brand/20 text-brand font-bold text-[13px] hover:bg-brand/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.97]"
          >
            {isConnecting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Connecting…</span>
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4" />
                <span className="hidden xs:inline">Connect Wallet</span>
              </>
            )}
          </button>
        )}

        {/* Inline error toast */}
        {error && (
          <div className="absolute top-full mt-2 right-0 z-50 flex items-start gap-2 bg-red-950/90 border border-red-500/30 rounded-xl px-4 py-3 w-[min(280px,90vw)] shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p className="text-[12px] text-red-300 leading-snug flex-1">{error}</p>
            <button onClick={clearError} className="text-red-400 hover:text-red-200 transition-colors shrink-0" aria-label="Close error message">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // ─── Full-size variant (platform cards / standalone pages) ────────────────
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Error banner */}
      {error && (
        <div className="flex items-start gap-2.5 bg-red-950/60 border border-red-500/25 rounded-xl px-4 py-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-[13px] text-red-300 leading-snug flex-1">{error}</p>
          <button onClick={clearError} className="text-red-400 hover:text-red-200 transition-colors shrink-0" aria-label="Close error message">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {isConnected && address ? (
        <button
          onClick={disconnect}
          aria-label="Disconnect wallet"
          className="w-full py-4 rounded-xl font-bold text-[14px] bg-transparent border border-white/10 text-white hover:bg-red-950/30 hover:border-red-500/30 hover:text-red-400 transition-all flex items-center justify-center gap-2.5 active:scale-[0.98]"
        >
          <LogOut className="w-4 h-4" />
          Disconnect
        </button>
      ) : (
        <button
          onClick={connectMetaMask}
          disabled={isConnecting}
          aria-label="Connect MetaMask wallet"
          className="w-full py-4 rounded-xl font-bold text-[14px] bg-brand hover:bg-brand-hover text-black shadow-[0_0_20px_rgba(0,229,143,0.2)] hover:shadow-[0_0_35px_rgba(0,229,143,0.35)] transition-all flex items-center justify-center gap-2.5 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isConnecting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Waiting for MetaMask…</span>
            </>
          ) : (
            <>
              <Wallet className="w-5 h-5" />
              <span>Connect MetaMask</span>
            </>
          )}
        </button>
      ) : (
        /* MetaMask not installed — prompt to install */
        <a
          href="https://metamask.io/download/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 rounded-xl font-bold text-[14px] bg-brand/10 border border-brand/20 text-brand hover:bg-brand/20 transition-all flex items-center justify-center gap-2.5 active:scale-[0.98]"
        >
          <ExternalLink className="w-5 h-5" />
          Install MetaMask to Connect
        </a>
      )}

      {/* Connecting progress indicator */}
      {isConnecting && (
        <p className="text-center text-[12px] text-[#5A6F65] animate-in fade-in duration-300">
          Check the MetaMask popup to approve the connection.
        </p>
      )}
    </div>
  );
}
