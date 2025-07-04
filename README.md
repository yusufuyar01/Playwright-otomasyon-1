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
```

Yazılan bağlantıyı bir pencerede açar ve otomasyon için gerekli olan locater parametrelerini gösterir.


## Klasörler
- `tests/` : Test dosyaları burada bulunur.
- `tests-examples/` : Örnek testler.
- `playwright.config.ts` : Playwright yapılandırma dosyası.

## Faydalı Komutlar
- Tüm testleri çalıştır: `npx playwright test`
- UI modunda başlat: `npx playwright test --ui`
- Debug modunda çalıştır: `npx playwright test --debug`

---

## Dosyalar

/helpers

- `login.ts` : Her kod başında kullanılan giriş için.
- `zoom.ts` : Otomasyonun tıklayacağı elemanlar ekranda görünmesi gerekir. Ekranın boyutunu ayarlayabilmek için.
- `ePostaUret.ts` :E-posta üretimi için.
- `stringUret.ts` :Metin değerleri üretmek için.
- `tcknUret.ts` :Tcno üretimi için.
- `telNoUret.ts` :Telefon numarası üretimi için.
- `vknUret.ts` :Vergi No üretimi için.


/tests <br <br>>
    /merchant <br>
    - `507-tuzel-mukellef-ekleme.spec.ts` 
    - `507-gercek-mukellef-ekleme.spec.ts` 
    - `509-tuzel-mukellef-ekleme.spec.ts` 
    - `509-gercek-mukellef-ekleme.spec.ts` 
    - `detay-payment-type-ekleme.spec.ts` 
    - `detay-e-belge-ekleme.spec.ts`  

!!! 507/509 mükellef ekleme gerek duyulmadı
!!! payment mediator (Ödeme Aracıları) uzun süreceğinden yapılmadı
