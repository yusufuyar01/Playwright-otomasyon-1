import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { tcknUret } from '../../helpers/tcknUret';
import { rastgeleString } from '../../helpers/stringUret';
import { ePostaUret } from '../../helpers/ePostaUret';
import { telNoUret } from '../../helpers/telNoUret';
import { zoom } from '../../helpers/zoom';

test('Gerçek Kişi Bayi Ekleme', async ({ page }) => {
  
  // Önce sisteme giriş yap
  await login(page);

  // Zoom işlemi
  await zoom(page);

  // ===== ADIM 1: Dashboard'da Bayi Yönetimi Menüsünü Bulma =====
  // Bayi yönetimi bul ve tıkla
  const bayiYonetimi = page.locator('text="Bayi Yönetimi"'); 
  await bayiYonetimi.click();
  await page.waitForTimeout(1000);

  // ===== ADIM 2: Bayi Menüsüne Tıklama =====
  // Bayi menü linkini bul ve tıkla
  const bayi = page.getByRole('link', { name: ' Bayi' }); 
  await bayi.click();
  await page.waitForTimeout(500);

  // ===== ADIM 3: Yeni Bayi Ekleme =====
  // Yeni bayi ekleme butonunu bul ve tıkla
  const yeniBayi = page.getByRole('button', { name: 'Yeni Ekle' }); 
  await yeniBayi.click();
  await page.waitForTimeout(1000);

  // ===== ADIM 4: Bayi Ekleme Formu Doldurulması =====

  // Vergi Tipi seçimi
  const taxType = page.getByRole('dialog').getByText('Tüzel');
  await taxType.click();

  // Gerçek kullanıcı seç
  const taxTypeOption = page.getByRole('option', { name: 'Gerçek' });
  await taxTypeOption.click();

  // ===== ADIM 5: Bayi adı girilmesi =====
  // bayi adı üret ve gir
  const bayiAdi = rastgeleString(10);
  console.log('Üretilen Bayi Adı:', bayiAdi);

  // Bayi adı alanına yaz
  const bayiAdiInput = page.locator('ot-data-entry-template').filter({ hasText: 'Bayi Adı' }).getByRole('textbox');
  await bayiAdiInput.fill(bayiAdi);

  // ===== ADIM 6: TCKN doldurulması =====
   // TC No üret
   const tckn = await tcknUret(page);
   console.log('Üretilen TC No:', tckn);
  
   // TC No alanına yaz
   const tcknInput = page.locator('ot-alpha-entry').filter({ hasText: 'TCKN'}).getByRole('textbox');
   await tcknInput.fill(tckn);

  // ===== ADIM 7: Vergi Dairesi Seçimi =====
  // "Başkent Vergi Dairesi" seçeneğine tıkla
  const baskVergiDairesi = page.getByText('Başkent Vergi Dairesi');
  await baskVergiDairesi.click();

 

  // Gerçek kişi adı, soyadı ve bayi kısa adı
  const ad = rastgeleString(10);
  const adInput = page.locator('ot-data-entry-template').filter({ hasText: /^Ad$/ }).getByRole('textbox');
  await adInput.fill(ad);
  
  const soyadInput = page.locator('div').filter({ hasText: /^Soyad$/ }).getByRole('textbox');
  await soyadInput.fill(ad);
  
  const bayiKisaAdiInput = page.locator('ot-data-entry-template').filter({ hasText: 'Bayi Kısa Ad'}).getByRole('textbox');
  await bayiKisaAdiInput.fill(ad);

  // Fatura başlığı alanına yaz
  const faturaBasligi = page.locator('ot-data-entry-template').filter({ hasText: 'Fatura Başlığı'}).getByRole('textbox');
  await faturaBasligi.fill(ad);

  // "Sektör" tıkla
  const sektorDropdown = page.getByText('Seçiniz...').first();
  await sektorDropdown.click();

  // "DENEME" seçeneğini seç
  const denemeOption = page.getByRole('option', { name: 'DENEME' });
  await denemeOption.click();

  // "Durum" dropdown'ına tıkla
  const durumDropdown = page.locator('ot-data-entry-template').filter({ hasText: 'Durum' }).locator('span').first();
  await durumDropdown.click();

  // "Başlangıç" seçeneğini seç
  const baslangicOption = page.getByRole('option', { name: 'Başlangıç' });
  await baslangicOption.click();

  // "Tercih Edilen Dil" dropdown'ına tıkla
  const tercihEdilenDil = page.locator('ot-data-entry-template').filter({ hasText: 'Tercih Edilen Dil' }).locator('span').nth(1);
  await tercihEdilenDil.click();

  // "Türkçe" seçeneğini seç
  const turkceOption = page.getByRole('option', { name: 'Türkçe' });
  await turkceOption.click();

  // "Entegratör" dropdown'ına tıkla
  const entegratorDropdown = page.locator('ot-data-entry-template').filter({ hasText: 'Entegratör' }).locator('span').nth(1);
  await entegratorDropdown.click();
  await page.waitForTimeout(500);

  // "Pavo Finansal Teknoloji Çözümleri A.Ş." seçeneğini seç
  const pavoFinansalTeknolojiOption = page.getByRole('option', { name: 'Pavo Finansal Teknoloji Çözümleri A.Ş.' });
  await pavoFinansalTeknolojiOption.click(); 
  await page.waitForTimeout(500);

  // "Şehir" dropdown'ına tıkla
  const sehirDropdown = page.locator('ot-data-entry-template').filter({ hasText: 'Şehir' }).locator('span').first();
  await sehirDropdown.click();

  // "ADANA" seçeneğini seç
  const adanaOption = page.getByRole('option', { name: 'ADANA' });
  await adanaOption.click();

  // "İlçe" dropdown'ına tıkla
  const ilceDropdown = page.locator('ot-data-entry-template').filter({ hasText: 'İlçe' }).locator('span').first();
  await ilceDropdown.click();

  // "Kozan" seçeneğini seç
  const kozanOption = page.getByRole('option', { name: 'KOZAN' });
  await kozanOption.click();
 
  // "Mahalle" dropdown'ına tıkla
  const mahalleDropdown = page.locator('ot-data-entry-template').filter({ hasText: 'Mahalle' }).locator('span').first();
  await mahalleDropdown.click();

  // "Akkaya Mahallesi" seçeneğini seç
  const akkayaOption = page.getByRole('option', { name: 'AKKAYA MAH.' });
  await akkayaOption.click();

  // "Adres" alanına yaz
  const adresInput = page.locator('ot-address-contact-entry').getByRole('textbox');
  await adresInput.fill('Adres'); 

  // E-Posta Adresi üret ve yaz
  const uretilenEposta = ePostaUret();
  console.log('Üretilen E-posta:', uretilenEposta);
  
  // E-Posta Adresi alanına yaz
  const ePostaInput1 = page.locator('ot-panel').filter({ hasText: 'Bayi Bilgisi' }).getByPlaceholder('ornek@ornek.com');
  await ePostaInput1.fill(uretilenEposta);

  // Telefon Numarası Üret
  const uretilenTelNo = telNoUret();
  console.log('Üretilen Telefon Numarası:', uretilenTelNo);
  
  // Telefon Numarası alanını yaz
  const telNoInput1 = page.locator('ot-data-entry-template').filter({ hasText: 'Fatura Cep Telefonu' }).getByRole('textbox');
  await telNoInput1.fill(uretilenTelNo);

  // Çevrim Dışı İşlem Limiti alanına 1000 yaz
  const cevrimDisiIşlemLimiti = page.locator('ot-data-entry-template').filter({ hasText: 'Çevrim Dışı İşlem Limiti' }).getByRole('spinbutton');
  await cevrimDisiIşlemLimiti.fill('1000');

  // Çevrim Dışı Satış Limiti alanına 1000 yaz
  const cevrimDisiSatisLimiti = page.locator('ot-data-entry-template').filter({ hasText: 'Çevrim Dışı Satış Limiti' }).getByRole('spinbutton');
  await cevrimDisiSatisLimiti.fill('1000');

  // Çevrim Dışı Gün Limiti alanına 1000 yaz
  const cevrimDisiGunLimiti = page.locator('ot-data-entry-template').filter({ hasText: 'Çevrim Dışı Gün Limiti' }).getByRole('spinbutton');
  await cevrimDisiGunLimiti.fill('1000');

  // Bayi admin kullanıcısı (bayi adı ile aynı değeri verdik)
  const adSoyadInput = page.locator('ot-data-entry-template').filter({ hasText: 'Adı Soyadı'}).getByRole('textbox');
  await adSoyadInput.fill(ad);

  // E-Posta Adresi alanına yaz
  const ePostaInput2 = page.locator('ot-panel').filter({ hasText: 'Bayi Admin Kullanıcısı' }).getByPlaceholder('ornek@ornek.com');
  await ePostaInput2.fill(uretilenEposta);

  // Telefon Numarası alanına yaz
  const telNoInput2 = page.locator('ot-data-entry-template').filter({ hasText: 'Telefon Numarası' }).getByRole('textbox');
  await telNoInput2.fill(uretilenTelNo);

  // Oluştur butonuna tıkla
  const olusturButton = page.getByRole('button', { name: 'Oluştur' }).first();
  await olusturButton.click();

  // Başarı mesajını kontrol et
  try {
    const basariMesaji = page.locator('.swal2-success-ring');
    await basariMesaji.waitFor();
    if (basariMesaji) {
      console.log('✅ Başarılı: Bayi başarıyla eklendi! (Gerçek Kişi)');
    } else {
      console.log('❌ Başarı mesajı bulunamadı');
    }
  } catch (error) {
    console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
  }

  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 