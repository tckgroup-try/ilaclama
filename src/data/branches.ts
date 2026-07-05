export interface Branch {
  id: number;
  district: string;
  name: string;
  url: string;
  lat: number;
  lng: number;
}

export const tckBranches: Branch[] = [
  { id: 1, district: 'Kadıköy', name: 'TCK İlaçlama Kadıköy Şubesi', url: 'https://share.google/5jDeIOxJxeuFRRRQW', lat: 40.9901, lng: 29.0290 },
  { id: 2, district: 'Şişli', name: 'TCK İlaçlama Şişli Şubesi', url: 'https://share.google/N94DyUd9TRPslyiIk', lat: 41.0600, lng: 28.9870 },
  { id: 3, district: 'Beşiktaş', name: 'TCK İlaçlama Beşiktaş Şubesi', url: 'https://share.google/ijFa1q8r3CzLWaUic', lat: 41.0428, lng: 29.0075 },
  { id: 4, district: 'Bakırköy', name: 'TCK İlaçlama Bakırköy Şubesi', url: 'https://share.google/crQMb4iO5ibsiRg6i', lat: 40.9783, lng: 28.7951 },
  { id: 5, district: 'Pendik', name: 'TCK İlaçlama Pendik Şubesi', url: 'https://share.google/XOBE4ZcEGDqto7Ozp', lat: 40.8753, lng: 29.2311 },
  { id: 6, district: 'Üsküdar', name: 'TCK İlaçlama Üsküdar Şubesi', url: 'https://share.google/sEIm5TIFqBUTJXJc3', lat: 41.0269, lng: 29.0157 },
  { id: 7, district: 'Maltepe', name: 'TCK İlaçlama Maltepe Şubesi', url: 'https://share.google/dMUnweakdgqQGn8df', lat: 40.9246, lng: 29.1311 },
  { id: 8, district: 'Kartal', name: 'TCK İlaçlama Kartal Şubesi', url: 'https://share.google/cANnFxkxzZDTejDut', lat: 40.8886, lng: 29.1856 },
  { id: 9, district: 'Ümraniye', name: 'TCK İlaçlama Ümraniye Şubesi', url: 'https://share.google/8ZgMKxIwMv6FvEhVb', lat: 41.0253, lng: 29.1172 },
  { id: 10, district: 'Ataşehir', name: 'TCK İlaçlama Ataşehir Şubesi', url: 'https://share.google/czL191N4STk2uB4vr', lat: 40.9847, lng: 29.1064 },
  { id: 11, district: 'Sarıyer', name: 'TCK İlaçlama Sarıyer Şubesi', url: 'https://share.google/goCQjqcwZbzTHO7zc', lat: 41.1663, lng: 29.0501 },
  { id: 12, district: 'Beykoz', name: 'TCK İlaçlama Beykoz Şubesi', url: 'https://share.google/JJXrgkJxBhvfHgW5t', lat: 41.1190, lng: 29.0850 },
  { id: 13, district: 'Beyoğlu', name: 'TCK İlaçlama Beyoğlu Şubesi', url: 'https://share.google/Lnw5Qs9XSme5glOYE', lat: 41.0370, lng: 28.9747 },
  { id: 14, district: 'Fatih', name: 'TCK İlaçlama Fatih Şubesi', url: 'https://share.google/79lufMNksa34uJXIi', lat: 41.0186, lng: 28.9405 },
  { id: 15, district: 'Zeytinburnu', name: 'TCK İlaçlama Zeytinburnu Şubesi', url: 'https://share.google/0Dwy9VV6RRK8AQReo', lat: 40.9881, lng: 28.8966 },
  { id: 16, district: 'Başakşehir', name: 'TCK İlaçlama Başakşehir Şubesi', url: 'https://share.google/Ew6z0WHzx2KPCx6Vu', lat: 41.0978, lng: 28.7972 },
  { id: 17, district: 'Beylikdüzü', name: 'TCK İlaçlama Beylikdüzü Şubesi', url: 'https://share.google/AmJX3KhGHz0ZjqX4l', lat: 40.9912, lng: 28.6473 },
  { id: 18, district: 'Esenyurt', name: 'TCK İlaçlama Esenyurt Şubesi', url: 'https://share.google/PbuFoox6M2PbycBdJ', lat: 41.0343, lng: 28.6801 },
  { id: 19, district: 'Avcılar', name: 'TCK İlaçlama Avcılar Şubesi', url: 'https://share.google/DIAPenuRh178ivV4z', lat: 40.9801, lng: 28.7176 },
  { id: 20, district: 'Küçükçekmece', name: 'TCK İlaçlama Küçükçekmece Şubesi', url: 'https://share.google/zLUHQdAI77X7UWH8Y', lat: 40.9919, lng: 28.7712 },
  { id: 21, district: 'Bahçelievler', name: 'TCK İlaçlama Bahçelievler Şubesi', url: 'https://share.google/Ir4F4mkHyv956D4fq', lat: 40.9972, lng: 28.8624 },
  { id: 22, district: 'Bağcılar', name: 'TCK İlaçlama Bağcılar Şubesi', url: 'https://share.google/og6JJuC2vmGA77CxM', lat: 41.0339, lng: 28.8579 },
  { id: 23, district: 'Gaziosmanpaşa', name: 'TCK İlaçlama Gaziosmanpaşa Şubesi', url: 'https://share.google/DbMSjJiy3uMkHxvg8', lat: 41.0578, lng: 28.9142 },
  { id: 24, district: 'Eyüpsultan', name: 'TCK İlaçlama Eyüpsultan Şubesi', url: 'https://share.google/BTczXal5dy35fTMHj', lat: 41.0478, lng: 28.9329 },
  { id: 25, district: 'Kağıthane', name: 'TCK İlaçlama Kağıthane Şubesi', url: 'https://share.google/FWiXo2inztRKxXwv3', lat: 41.0811, lng: 28.9730 },
  { id: 26, district: 'Şile', name: 'TCK İlaçlama Şile Şubesi', url: 'https://share.google/39vWO2xliGPLKnqa9', lat: 41.1744, lng: 29.6125 },
  { id: 27, district: 'Çekmeköy', name: 'TCK İlaçlama Çekmeköy Şubesi', url: 'https://share.google/NWgczfDU9rGwwuYYc', lat: 41.0346, lng: 29.1764 },
  { id: 28, district: 'Tuzla', name: 'TCK İlaçlama Tuzla Şubesi', url: 'https://share.google/QeuNSuODdnZKRfCyt', lat: 40.8159, lng: 29.3094 }
];
