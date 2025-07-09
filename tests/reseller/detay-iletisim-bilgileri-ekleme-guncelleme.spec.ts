import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { ePostaUret } from '../../helpers/ePostaUret';
import { telNoUret } from '../../helpers/telNoUret';
import { rastgeleString } from '../../helpers/stringUret';
import { zoom } from '../../helpers/zoom';

test('Detay İletişim Bilgileri Ekleme ve Güncelleme', async ({ page }) => {
  
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
  const bayi = page.getByRole('link', { name: ' Bayi' }); 
  await bayi.click();
  await page.waitForTimeout(500);

  // ===== ADIM 3: Mevcut Bayi Seçimi =====
  // İlk bayi satırını seç (test için)
  const ilkBayiSatiri = page.locator('table tbody tr').first();
  await ilkBayiSatiri.click();
  await page.waitForTimeout(1000);

  // ===== ADIM 4: Detay Butonuna Tıklama =====
  // ===== ADIM 3: Değişikliklerin yapılacağı üye işyeri seçimi (rastgele) =====
  // ilk 8 satırdan rastgele seç
  const randomRowNumber = Math.floor(Math.random() * 10) + 2;
  console.log(`🎯 Rastgele seçilen satır numarası: ${randomRowNumber + 1}`);
  const firstRowExpand = page.locator('.k-hierarchy-cell.k-table-td').nth(randomRowNumber);


  // const firstRowExpand = page.getByRole('row', { name: /Expand Details/ }).getByRole('button').nth(1);
  await firstRowExpand.click();
  await page.waitForTimeout(1000);

  // yeni butonuna tıkla
  await page.getByRole('button', { name: '+ Yeni' }).click();

  // Ana iletişim seç
  await page.getByText('Adres Tipi seçiniz...').click();

  const options = page.getByRole('option').all();
  console.log(options);









  // Kaydet
  await kaydetButton.click();
  await page.waitForTimeout(2000);

  // Telefon ekleme başarı mesajını kontrol et
  try {
    const telefonBasariMesaji = page.locator('text="İletişim bilgisi başarıyla eklendi"');
    await telefonBasariMesaji.waitFor({ timeout: 5000 });
    console.log('✅ Başarılı: Telefon numarası başarıyla eklendi!');
  } catch (error) {
    console.log('❌ Telefon ekleme başarı mesajı kontrol edilirken hata oluştu:', error.message);
  }

  // ===== ADIM 13: Eklenen İletişim Bilgilerini Doğrulama =====
  // Tabloda eklenen bilgilerin görünür olduğunu kontrol et
  const guncelEpostaSatiri = page.locator('table tbody tr').filter({ hasText: guncelEposta });
  await expect(guncelEpostaSatiri).toBeVisible();
  console.log('✅ Güncellenmiş e-posta tabloda görünür');

  const telefonSatiri = page.locator('table tbody tr').filter({ hasText: yeniTelefon });
  await expect(telefonSatiri).toBeVisible();
  console.log('✅ Eklenen telefon numarası tabloda görünür');

  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 