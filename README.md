# Playwright Regresyon Otomasyonu

Bu proje, Playwright kullanarak web uygulamalarının otomatik regresyon testlerini yazmak için oluşturulmuştur.

## Başlangıç

Projeyi çalıştırmak için aşağıdaki komutları kullanabilirsiniz:

```bash
npx playwright test 
```

Bu komut projeyi genel çalıştırır(önerilmez). Daha fazla bilgi için [Playwright dokümantasyonuna](https://playwright.dev/docs/intro) göz atabilirsiniz.

## 


```bash
npx playwright test tests/merchant/deneme.spec.ts --headed
```

Çalıştırmak iştediğiniz test dosyasının dizinini seçin. '--headed', otomasyon çalışırken ekranda canlı olarak çalıştırır.

## 

```bash
npx playwright codegen https://www.google.com/
---

Yazılan bağlantıyı bir pencerede açar ve otomasyon için gerekli olan locater parametrelerini gösterir.

## 

## Klasörler
- `tests/` : Test dosyaları burada bulunur.
- `tests-examples/` : Örnek testler.
- `playwright.config.ts` : Playwright yapılandırma dosyası.

## Faydalı Komutlar
- Tüm testleri çalıştır: `npx playwright test`
- UI modunda başlat: `npx playwright test --ui`
- Debug modunda çalıştır: `npx playwright test --debug`

---
Türkçe açıklamalar ve örnekler ile geliştirmeye devam edebilirsiniz.


