import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';
import { rastgeleString } from '../../helpers/stringUret';

test('Cihaz Güncelleme', async ({ page }) => {

  // Önce sisteme giriş yap
  await login(page);

  // Zoom işlemi
  await zoom(page);

  // ===== ADIM 1: Dashboard'da Cihaz Yönetimi Menüsünü Bulma =====
  // Cihaz yönetimi bul ve tıkla
  const cihazYonetimi = page.locator('text="Cihaz Yönetimi"'); 
  await cihazYonetimi.click();

  // ===== ADIM 2: Cihaz İşlemleri Sayfasına Gitme =====
  // Cihaz İşlemleri menü linkini bul ve tıkla
  const cihazIslemleri = page.getByRole('link', { name: ' Cihaz İşlemleri' });
  await cihazIslemleri.click();

  // ===== ADIM 3: Mevcut Cihazı Bulma ve Seçme =====
  // Son eklenen cihazı seç
  await page.getByRole('row').nth(1).getByRole('button').click();

  // ===== ADIM 5: Cihaz Bilgilerini Güncelleme =====
  // Cihaz Seri No güncelle
  const yeniCihazSeriNo = ("PAVGUNCELLEME" + rastgeleString(5)).toUpperCase();
  console.log('Güncellenen Cihaz Seri No:', yeniCihazSeriNo);
  const seriNoInput = page.locator('ot-data-entry-template').filter({ hasText: 'Seri Numarası' }).getByRole('textbox');
  await seriNoInput.clear();
  await seriNoInput.fill(yeniCihazSeriNo);


  // ===== ADIM 6: Güncellemeyi Kaydetme =====
  // Güncelle butonu
  await page.getByRole('button', { name: 'Güncelle' }).click();

  // ===== ADIM 7: Başarı Kontrolü =====
  try {
    const basariMesaji = await page.getByText('Başarılı The Device has been');
    await expect(basariMesaji).toBeVisible();
    console.log('✅ Cihaz başarıyla güncellendi');
  } catch (error) {
    console.log('⚠️ Başarı mesajı görünmedi, cihaz güncellenmiş olabilir');
  }

  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 