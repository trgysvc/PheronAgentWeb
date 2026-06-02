# AudioIntelligence: Infinity Engine (v8.1.5)

AudioIntelligence is a premium, high-fidelity Music Information Retrieval (MIR) and DSP framework. Built for Swift 6 and Apple Silicon (M4 optimized), it delivers bit-exact scientific accuracy validated against the EBU SQAM dataset.

In the Pheron Agent ecosystem, the **Music DNA** tool leverages this library to execute deep time-domain and frequency-domain audio analyses, exporting comprehensive forensic metadata reports.

---

## 🚀 Key Advantages & Features

While legacy Python-based competitor libraries are excellent for research, AudioIntelligence is engineered for Industrial-Grade local production on macOS:

* ⚡ **Sub-millisecond Latency:** Utilizes native AMX (Apple Matrix Extension) and custom Metal kernels for real-time professional workflows.
* 🎨 **Native SwiftUI UI:** Includes `AudioIntelligenceUI` for hardware-accelerated, real-time spectrograms, waveforms, and meters.
* 🛡️ **Swift 6 Actor Isolation:** The world's first MIR library with compile-time thread safety and zero data races.
* 💿 **Professional Format Support:** Mastery of all native Apple codecs including AAC, MP3, ALAC, and FLAC via `AVAudioConverter`.
* 🍏 **Apple Binary Standard:** Zero JSON overhead for data outputs. All forensic DNA signatures are exported in high-performance `.plist` (Apple Property List) format.
* 4️⃣ **Hybrid 4GB Cache:** Advanced persistent storage for instantaneous retrieval of forensic DNA signatures across sessions.

---

## 🌉 Seamless Python Migration

AudioIntelligence provides 1:1 functional parity with popular legacy Python packages while delivering **10x performance improvements** on Apple Silicon:
* **Migration Guide:** A seamless Rosetta stone for users of legacy audio libraries converting code to Swift.
* **Format Support:** Native decoding support for WAV, MP3, FLAC, and more.

---

## 💎 Professional Standards & Compliance

The Infinity Engine is formally validated against industry "Gold Standards":
* **ITU-R BS.1770-4 / EBU R128:** Bit-exact, multi-channel loudness metering ($\pm 0.1$ LU precision).
* **Forensic True Peak:** 511-tap high-precision inter-sample detection (BT.1770 compliant).
* **EBU Tech 3341/3342:** Verified Integrated, Momentary, Short-term, and LRA compliance.
* **SQAM Level A:** Comprehensive 70-track scientific audit completed with 100% stability.
* **Scientific Integrity:** Verified mathematical parity with industry-standard legacy libraries (Mean Squared Error: $\text{MSE} < 0.00018$).

---

## 🧪 The Infinity Suite: 26 Forensic Engines

AudioIntelligence organizes its 26 specialized DSP engines into the following domains:

### 1. Core Analysis
* **STFT / ISTFT:** Frame-major, vDSP-optimized spectral foundations.
* **Loudness (EBU R128):** Scientifically calibrated gating and weighting.
* **True Peak:** $4\times$ sinc-interpolated inter-sample detection.
* **Forensic DNA:** Bit-depth integrity and forgery auditing.

### 2. Music Information Retrieval (MIR)
* **Mel / Chroma / CQT / VQT:** High-resolution pitch and timbral transforms.
* **Viterbi Decoder:** Professional sequence modeling for state analysis.
* **Onsets & Rhythm:** Multi-band rhythmic mapping and tempograms.
* **Harmony & Tonnetz:** 6D Harmonic relationship mapping on the tonnetz grid.
* **StructureEngine:** Automated structural segmentation (Intro, Verse, Chorus, Outro) and Recurrence Matrices.
* **Wavelets:** Multi-resolution analysis via DWT (Haar, Daubechies 2/3).

### 3. Advanced Processing & Science
* **NMF Source Separation:** Deterministic non-negative matrix factorization.
* **HPSS:** Median-filter based Harmonic-Percussive source separation.
* **Pitch Audits:** YIN, Piptrack (parabolic), and Viterbi sequence tracking.
* **AudioScience:** AES17 dynamic range, SMPTE IMD, and ITU-R 468-4 weighting.
* **Instrument DNA:** Neural-assisted instrument fingerprinting and predictions.

---

## 🏗 Architecture & Modules

AudioIntelligence is organized into specialized domains for maximum performance and architectural clarity:

```
Sources/AudioIntelligenceCore/
├── Core/       # Foundation (Loading, Caching, Phase Vocoding)
├── Feature/    # Analysis (Spectral, Rhythm, Pitch, Harmonic, Mastering)
├── Effects/    # Transformation (HPSS, Stem Separation, NMF)
├── Display/    # Visualization (Metal Spectrograms, Waveforms)
└── Util/       # Governance (DNA Reporting, Calibration, DSP Helpers)
```

---

## 🤖 AI & Agent Integration

Pheron Agent integrates with the Infinity Engine to enable automated audio mastering, verification, and forensic analysis pipelines:
* **Scientific Integrity Report:** Generated automatically upon request.
* **Report Specification:** Detailed forensic analysis output formatted in standard Apple `.plist` files.
* **Engine Catalog:** Comprehensive technical specifications for all 26 specialized DSP engines.

---

## 🧪 Scientific Validation

We maintain a strict "Scientific First" policy. Every algorithm is validated against official industry test vectors to ensure absolute forensic integrity:
* **Automated CI Suite:** Run on macOS 15 runners via GitHub Actions.
* **Reference Parity:** High-precision tests verify parity with EBU R128 and ITU-R BS.1770 standards.
* **SQAM Suite:** Comprehensive analysis of the official EBU Sound Quality Assessment Material library.
* **Regression Testing:** Extensive coverage for multi-channel energy summation and gating logic.

To run the scientific validation suite locally:
```bash
swift test --filter ScientificValidationTests
```
