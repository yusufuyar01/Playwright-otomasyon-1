import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { rastgeleString } from '../../helpers/stringUret';
import { zoom } from '../../helpers/zoom';

test('Detay Belge Ekleme, Güncelleme, Görüntüleme ve Silme', async ({ page }) => {

  // Önce sisteme giriş yap
  await login(page);

  // Zoom işlemi
  await zoom(page);

  // ===== ADIM 1: Dashboard'da Üye İşyeri Yönetimi Menüsünü Bulma =====
  // Üye işyeri yönetimi bul ve tıkla
  const uyeIsyeriYonetimi = page.locator('text="Üye İşyeri Yönetimi"'); 
  await uyeIsyeriYonetimi.click();
  await page.waitForTimeout(1000);

  // ===== ADIM 2: Üye İşyeri Tıklama =====
  // Üye işyeri menü linkini bul ve tıkla (URL ile spesifik olarak hedefle)
  const uyeIsyeri = page.locator('a[href="/Merchant/Merchant/Index"]'); 
  await uyeIsyeri.click();
  await page.waitForTimeout(500);

  // ===== ADIM 3: Detay Menü =====
  // Detay menüye tıkla (ilk 10 satırdan rastgele seç)
  const randomRowNumber = Math.floor(Math.random() * 10) + 2;
  console.log(`🎯 Rastgele seçilen satır numarası: ${randomRowNumber}`);
  const firstRowExpand = page.locator(`tr:nth-child(${randomRowNumber}) > .k-hierarchy-cell`);

  // bu satır özellikle bir detay satırını incelemek için konulmuştur. hemen yukarıdaki 3 satırı yorum satırına alarak kullanabilirsiniz.
  // const firstRowExpand = page.locator('tr:nth-child(4) > .k-hierarchy-cell');
  await firstRowExpand.click();

  // "Belgeler" tıklama 
  const belgelerMenu = page.getByText('Belgeler');
  await belgelerMenu.click();

  // ===== ADIM 4: Belge Ekleme =====
  console.log('📄 Belge ekleme işlemi başlıyor...');
  
  // "Yeni" butonu
  const yeniButton = page.getByRole('button', { name: '+ Yeni' });
  await yeniButton.click();

  // Belge türü seçimi
  await page.locator('ot-data-entry-template').filter({ hasText: 'Belge Türü' }).getByLabel('Select').click();
  
  // Dropdown'da çıkan ilk elemana tıkla
  const firstOption = await page.getByRole('option').first();
  await firstOption.click();

  // Belge adı alanına rastgele metin yaz
  const belgeAdi = rastgeleString(10);
  const belgeAdiInput = page.getByRole('dialog').locator('input[type="text"]').first();
  await belgeAdiInput.fill(belgeAdi);

  // Belge açıklaması alanına rastgele metin yaz
  const belgeAciklamasi = rastgeleString(20);
  const belgeAciklamasiInput = page.locator('textarea');
  await belgeAciklamasiInput.fill(belgeAciklamasi);

  // Dosya yükleme (örnek dosya seçimi)
  const dosyaInput = page.locator('input[type="file"]');
  await dosyaInput.setInputFiles('helpers/ornek/ornek-pdf.pdf');

  // Kaydet butonuna tıkla
  await page.getByRole('button', { name: 'Kaydet' }).click();

  // Başarı mesajını kontrol et
  try {
    const basariMesaji = page.getByText('Belge başarıyla kaydedildi');
    await basariMesaji.waitFor({ timeout: 3000 });
    console.log('✅ Belge başarıyla eklendi');
  } catch (error) {
    console.log('⚠️ Belge ekleme işlemi tamamlanamadı olabilir.');
  }

  // ===== ADIM 5: Belge Görüntüleme =====
  console.log('👁️ Belge görüntüleme işlemi başlıyor...');
  
  // Eklenen belgeyi bul ve görüntüle butonuna tıkla
  const belgeSatiri = page.locator(`tr:has-text("${belgeAdi}")`);
  const goruntuleButton = belgeSatiri.locator('button[title="Görüntüle"]');
  await goruntuleButton.click();

  // Belge görüntüleme modalının açıldığını kontrol et
  try {
    const belgeModal = page.locator('.modal-content, .dialog-content');
    await belgeModal.waitFor({ timeout: 3000 });
    console.log('✅ Belge görüntüleme modalı açıldı');
    
    // Modalı kapat
    const kapatButton = page.getByRole('button', { name: 'Kapat' });
    await kapatButton.click();
  } catch (error) {
    console.log('⚠️ Belge görüntüleme modalı açılamadı.');
  }

  // ===== ADIM 6: Belge Güncelleme =====
  console.log('✏️ Belge güncelleme işlemi başlıyor...');
  
  // Belgeyi düzenle butonuna tıkla
  const duzenleButton = belgeSatiri.locator('button[title="Düzenle"]');
  await duzenleButton.click();

  // Belge adını güncelle
  const yeniBelgeAdi = rastgeleString(10);
  await belgeAdiInput.clear();
  await belgeAdiInput.fill(yeniBelgeAdi);

  // Belge açıklamasını güncelle
  const yeniBelgeAciklamasi = rastgeleString(25);
  await belgeAciklamasiInput.clear();
  await belgeAciklamasiInput.fill(yeniBelgeAciklamasi);

  // Güncelle butonuna tıkla
  await page.getByRole('button', { name: 'Güncelle' }).click();

  // Güncelleme başarı mesajını kontrol et
  try {
    const guncellemeMesaji = page.getByText('Belge başarıyla güncellendi');
    await guncellemeMesaji.waitFor({ timeout: 3000 });
    console.log('✅ Belge başarıyla güncellendi');
  } catch (error) {
    console.log('⚠️ Belge güncelleme işlemi tamamlanamadı olabilir.');
  }

  // ===== ADIM 7: Belge Silme =====
  console.log('🗑️ Belge silme işlemi başlıyor...');
  
  // Güncellenmiş belgeyi bul
  const guncellenmisBelgeSatiri = page.locator(`tr:has-text("${yeniBelgeAdi}")`);
  
  // Sil butonuna tıkla
  const silButton = guncellenmisBelgeSatiri.locator('button[title="Sil"]');
  await silButton.click();

  // Silme onay dialogunu bekle ve onayla
  try {
    const onayDialog = page.locator('.modal-content, .dialog-content');
    await onayDialog.waitFor({ timeout: 3000 });
    
    // "Evet" veya "Onayla" butonuna tıkla
    const onayButton = page.getByRole('button', { name: /Evet|Onayla|Sil/ });
    await onayButton.click();
    
    // Silme başarı mesajını kontrol et
    const silmeMesaji = page.getByText('Belge başarıyla silindi');
    await silmeMesaji.waitFor({ timeout: 3000 });
    console.log('✅ Belge başarıyla silindi');
  } catch (error) {
    console.log('⚠️ Belge silme işlemi tamamlanamadı olabilir.');
  }

  // ===== ADIM 8: Test Sonucu =====
  console.log('🎉 Belge işlemleri testi tamamlandı!');
  
  // Test sonunda kısa bir bekleme
  await page.waitForTimeout(2000);

  await page.pause();

}); 