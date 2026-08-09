# Değişim Günlüğü

Bu projedeki tüm önemli değişiklikler bu dosyada belgelenir.

Format [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) esas alınmıştır ve bu proje [Semantic Versioning](https://semver.org/spec/v2.0.0.html) sürümlemesine uyar.

## [1.0.6] - 2026-08-01

### Eklenenler
- **Lark Suite Entegrasyonu** — Lark/Feishu'nun resmi MCP sunucusunu mesajlaşma, sohbetler, takvim, Base, dokümanlar ve görevler için kendi-uygulamanı-bağla yöntemiyle köprüler.
- **LemonSqueezy Entegrasyonu** — Siparişleri, müşterileri, abonelikleri, indirimleri ve lisans anahtarlarını yönetmek için doğrudan REST köprüsü.
- **Kit (ConvertKit) Entegrasyonu** — Aboneleri, yayınları, dizileri ve etiketleri yönetmek için doğrudan REST köprüsü.
- **MCP Hub Bağlantı Kesme Desteği** — Bağlı her servis artık kimlik bilgisini temizlemek ve bağlantıyı kesmek için tek tıkla bir yola sahip.
- **Audacity Entegrasyonu** — Ses düzenleme ve efektler için çalışan bir Audacity örneğini kendi betikleme protokolü üzerinden doğrudan kontrol edin.
- **Apple Notlar, Hatırlatıcılar ve Office Dışa Aktarma** — Yerel Notlar/Hatırlatıcılar desteği, Numbers/Keynote/Pages'ten gerçek Excel/PowerPoint/Word dışa aktarımı ve cihaz üzerinde arka plan kaldırma.

### Düzeltilenler
- **Web Arama ve Alıntı Güvenilirliği** — Düşürülen arama sonuçları, yanlış "eksik yanıt" reddi ve yanlış işaretlenmiş alıntılar dahil bir dizi araştırma-yanıt sorunu düzeltildi.
- **Yeni Araç Keşfedilebilirliği** — Notlar, Hatırlatıcılar, arka plan kaldırma ve Office belge araçları artık basit isteklerle doğru şekilde erişilebilir.
- **Çok Adımlı Görev Tamamlama** — Ajanın bir sonraki adımı yürütmeden tarif edebildiği veya bir raporu yazmadan tamamlandı olarak işaretleyebildiği durumlar düzeltildi.
- **Bellek ve Hatırlama Güvenilirliği** — "Bunu hatırla" istekleri artık sessizce hiçbir şey yapmak yerine güvenilir şekilde kaydediyor.
- **Daha Güvenli Araç Yeniden Deneme Mantığı** — Tekrarlanan hatalardan sonra devre dışı bırakılan bir araç artık otomatik olarak kurtuluyor ve kalıcı kısıtlamalar yeniden denenmek yerine hemen bildiriliyor.
- **Takvim Tarih Doğruluğu** — Etkinliklerin yanlış bir tarihle sessizce kaydedilebildiği bir hata düzeltildi.
- **Stripe ve Git Entegrasyon Düzeltmeleri** — Üst akış değişikliğinden sonra Stripe'ın eylem kümesi düzeltildi ve Git MCP entegrasyonu kararlı hale getirildi.
- **Dosya ve Klasör İşlem Güvenliği** — Yol izni kontrollerinde ve klasör taşıma/kopyalama davranışında uç durumlar düzeltildi.
- **Genel Güvenilirlik** — Telemetri iletimi, tarayıcı otomasyonu, zaman aşımı bütçeleri ve sistem yükü tespitinde küçük düzeltmeler.

## [1.0.5] - 2026-07-24

### Düzeltilenler
- **Kaynak Alıntı Güvenliği** — Alıntı güvenlik kontrollerini aktif yürütme yoluna taşıyarak, ajanın var olmayan kaynak URL'leri, tarihler veya sürüm numaraları alıntılayabilmesi sorunu düzeltildi.
- **Bileşik İstek Yürütme** — Eksik araç çağrılarını zorunlu kılarak, bileşik çok parçalı isteklerin (örn. telemetri ve işletim sistemi sürümünü birlikte istemek) yalnızca yarım yanıtla dönebilmesi sorunu düzeltildi.
- **Kabuk Çıktı Yönlendirme Güvenliği** — Çıplak tek dosya kabuk yönlendirmelerinin (`command > file`) ikili koruma ve yazma güvenlik kontrollerini atlaması engellendi.
- **Bot Tespiti ve CAPTCHA Filtreleme** — Web araması artık arama motorlarından CAPTCHA/bot-doğrulama sayfalarını tespit edip filtreleyerek akıl yürütmenin doğrulama metninden etkilenmesini önlüyor.
- **Google Arama JS Stabilizasyonu** — İstemci taraflı JavaScript render işleminin tamamlanmasını bekleyerek Google arama sonucu getirme işlemi iyileştirildi.
- **Safari Yedek Dayanıklılığı** — Gerektiğinde net izin rehberliğiyle arama yedeği için gerçekten görünür Safari sekmeleri açıyor.
- **Biyometrik ve Anahtarlık Eşzamanlılığı** — Touch ID zaman aşımı işleme düzeltildi ve arka plan Anahtarlık okumalarının araç kullanılabilirlik kontrollerini bloke etmesi engellendi.
- **Daemon Yeniden Deneme Limitleri** — Başarısız arka plan daemon bağlantılarının süresiz olarak yeniden denenmesi engellendi.

### Eklenenler
- **Yetkili Kaynak Araştırması** — Ajan artık üçüncü taraf arama snippet'leri yerine resmi proje verilerine, yapılandırılmış spesifikasyonlara ve doğrudan dokümantasyona öncelik veriyor.
- **Genişletilmiş GitHub Araç Setleri** — GitHub Actions, kod güvenliği, Dependabot, tartışmalar, danışma bildirimleri, gist'ler, projeler, etiketler ve bildirimler için erişim eklendi.

## [1.0.4] - 2026-07-06

### Eklenenler
- **MCP Araç Köprüleri** — Pheron Agent artık Git, Playwright tarayıcı otomasyonu, Perplexity web araması, Stripe, GitHub, Notion, Unreal Engine ve Zapier dahil harici Model Context Protocol (MCP) sunucularıyla entegre oluyor.
- **MCP Hub ve Bağlantılar** — Harici araç bağlantıları için kimlik bilgilerini kolayca yapılandırmak, kaydetmek ve test etmek için Ayarlar > Bağlantılar'da özel bir kart-ızgara sihirbazı eklendi.
- **Bağlam Duyarlı Öneriler** — Ajan artık bir görev, kimlik bilgisi gereken bir araç gerektirdiğinde Ayarlar > Bağlantılar'da eksik entegrasyonları bağlamayı öneriyor.
- **Birleşik Ekran ve Erişilebilirlik Akıl Yürütmesi** — Daha tutarlı ve güvenilir tarayıcı/ekran ile ilgili eylemler için ekran görüntüsü açıklamaları, OCR ve AX ağacı analizi zincirlendi.
- **Yerel Kullanıcı Profili** — Ajan tarafından keşfedilen tercihler ve kullanıcı kimlik bilgileri artık okunabilir bir Markdown profilinde (`UserProfile.md`) kaydediliyor.
- **Performans Sekmesi Yeniden Tasarımı** — Ayarlar altındaki Sağlık ve Analitik sekmeleri, gerçek zamanlı CPU, bellek ve hız kullanım trend grafikleri içeren tek bir sekme altında birleştirildi.
- **Disk Telemetrisi Desteği** — Telemetri raporları artık CPU ve bellek istatistiklerinin yanı sıra önyükleme birimi boş alanını da içeriyor.

### Düzeltilenler
- **Çok Turlu Konuşma Bağlamı** — Aynı konuşma dizisindeki ardışık turlar arasında bağlam kaybı düzeltildi, ajanın anlık bağlamı hatırlaması sağlandı.
- **Model Bağlam Limitleri** — Daha yüksek RAM'li sistemlerde kullanılabilir token pencerelerini yapay olarak kısıtlayan yerel model bağlam bütçesi ölçeklendirme sorunları düzeltildi.
- **Bellek Döngüsü Düzeltmeleri** — Kullanıcı-hatırlama detaylarını ararken (örn. "adımı hatırlıyor musun?") bir araç-çağırma döngüsü tetiklenmesi giderildi.
- **Anahtarlık ve Kimlik Doğrulama Kararlılığı** — Notion/Zapier için OAuth akış geri çağrıları düzeltildi ve yerel test yürütmeleri sırasında silinen Anahtarlık girişleri geri yüklendi.
- **Görev Değiştirme Performansı** — CPU sızıntılarını önlemek için zaman aşımında veya görev iptalinde arka plan işlemleri ve komut yürütmeleri hemen durduruldu.
- **Türkçe Komut Edat Yönlendirmesi** — "üzerinden" içeren Türkçe istemlerin yanlışlıkla matematik/hesaplama yoluna gönderildiği bir yanlış yönlendirme hatası düzeltildi.

## [1.0.3] - 2026-06-19

### Eklenenler
- **Kişisel bellek ve hatırlama** — ajan artık açıkça paylaştığınız bilgileri (geçmiş, özgeçmiş, tercihler) sorduğunuzda güvenilir şekilde hatırlıyor ve gösteriyor; kaydedilen bilgilerin fiilen aranamaz hale gelebildiği derin bir erişim boşluğu kapatıldı
- **Çok dilli dosya/klasör komutları** — "bu klasörü düzenle" tarzı istekler artık sadece Türkçe/İngilizce değil, 13 dilde tanınıyor (ES, FR, DE, PT, IT, RU, ZH, JA, KO, AR, TR/EN'e ek olarak eklendi)
- **MusicDNA rapor eylemleri** — analiz sonuçları artık oluşturulan `.dna.md` / `.report.plist` dosyalarına doğrudan gitmek için "Raporu Aç" ve "Finder'da Göster" düğmeleri içeriyor
- **Telemetri — Supabase entegrasyonu:** tüm telemetri olayları artık kimlik doğrulamalı istekler, yeniden deneme mantığı ve çıkışta senkron flush ile `telemetry_events` üzerinden akıyor
- **Enerji takibi — IOKit tabanlı:** `powermetrics` üzerinden gerçek CPU+GPU+ANE joule ölçümleri, menü çubuğu efor göstergesinde canlı gösteriliyor
- **Analitik varsayılan olarak açık:** açık bir tercih belirtilmediğinde analitik artık varsayılan olarak etkin

### Düzeltilenler
- **Açıklayıcı bir sorudan sonra bağlam kaybı** — ajanın takip sorusuna (örn. "hangi tarih formatı?") cevap vermek daha önce konuşmayı alakasız sonuçlara sürükleyebiliyordu (başıboş bir "ram" alt dizesi eşleşmesi bu yanıtları yanlış yönlendiriyordu); ajan artık cevap verdikten sonra orijinal görevde kalıyor
- **Daha hızlı kişisel-hatırlama yanıtları** — ajan daha önce size söylediğiniz bir şeyi ararken boşa harcanan bir akıl yürütme turu ortadan kaldırıldı
- Apple Music oynatma ve ses kontrolü: onay artık gerçek oynatıcı durumunu yansıtıyor, Music zaten çalışmıyorken sessiz başarısızlıklar düzeltildi
- Telemetri: RAM/çıkarım metrikleri ve kimlik doğrulama artık eski veya sıfır değerler bildirmiyor; başarısız analitik grupları artık sessizce başarısız olmuyor
- Hata ayıklama derlemeleri artık doğru geliştirme ekibiyle imzalanıyor, eksik yetkilendirmeler düzeltildi

## [1.0.2] - 2026-06-03

### Eklenenler
- **Arka plan görev işleme** — bir görev hâlâ çalışırken yeni bir konuşma başlatın; eski konuşma kenar çubuğunda bir ⟳ göstergesiyle kalır ve arka planda devam eder
- **Görev kesintisi** — Durdur düğmesi (ve Escape tuşu) çalışan bir görevi yürütme sırasında iptal eder
- **Model Hub** — tam model kataloğu: 3 sütunlu bir ızgarada 30'dan fazla yerel MLX modeli (Qwen3, Llama 4, Gemma 3/4, Mistral, Devstral, Phi-4, DeepSeek); donanıma duyarlı görüntüleme
- **VLM (Görme) desteği** genişletildi: 48 GB+ sistemler için Qwen2.5-VL 7B eklendi
- Tam dosya listeleri ve RAM gereksinimleriyle **Yardım → Model Kataloğu** dokümantasyon bölümü
- **Lisans derin bağlantısı** — tek tıkla etkinleştirme için `pheron://activate?key=...` URL şeması
- Qwen3 Dense: 0.6B · 1.7B · 4B · 8B · 14B · 32B
- Qwen3 MoE: 30B-A3B · Coder-30B-A3B · Next-80B-A3B · 235B-A22B · Coder-480B-A35B
- Llama 4 Maverick (512 GB)
- Mistral Small 3.2 24B · Devstral Small 24B · Mistral Large 123B · Devstral 2 123B
- DeepSeek V4 Flash (192 GB)
- VLM: Qwen2.5-VL 7B (48 GB+)

### Değişenler
- Oturum başlıkları artık model adı yerine ilk mesajı kullanıyor
- Model Hub VLM bölümü ayrı gösteriliyor
- Ayarlar → AI sekmesi artık Yapılandırma bölümünü içeriyor
- WebSearchTool güvenilirlik iyileştirmeleri

### Düzeltilenler
- Önceden doldurulmuş bir anahtarla açıldığında lisans etkinleştirme penceresi artık doğru şekilde yeniden oluşturuluyor

## [1.0.1] - 2026-06-01

### Değişenler
- Minimum RAM tüm dokümanlarda ve Info.plist'te 16 GB olarak güncellendi

### Düzeltilenler
- Profil panelindeki gizli aktarım Apple ID gösterimi ("Apple Hesabı" + Apple logosu gösteriyor)
- Profil ve Analitik sekmeleri için Ayarlar penceresi yeniden boyutlandırma
- Yardım menüsünde eksik İade Politikası öğesi
- Uygulama içi Yardım paketi yolu (dokümanlar yüklenmiyordu)
- Dokümantasyon arayüzü gezinme yolları genelinde düzeltildi

## [1.0.0] - 2026-06-01
Herkese Açık Sürüm

### Eklenenler
- Supabase kimlik doğrulamasıyla Apple ile Giriş Yap
- Lemon Squeezy ile lisans etkinleştirme

### Düzeltilenler
- Ayarlar penceresi artık sekme içeriğine göre otomatik yeniden boyutlanıyor
- Analitik sekmesi pencere boyutlandırma düzeltmesi (asenkron veri yükleme)
- Profil paneli pencere boyutlandırma düzeltmesi
