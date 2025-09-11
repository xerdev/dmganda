# API Cek Ganda & Nickname Mobile Legends

Selamat datang di dokumentasi resmi API Cek Ganda & Nickname Mobile Legends. API ini memungkinkan Anda untuk dengan mudah memeriksa nama panggilan (nickname) dan status *double recharge* dari akun Mobile Legends berdasarkan ID Pengguna dan ID Server.

API ini di-host di Vercel dan dapat diakses secara publik.

**Base URL**: `https://mann-cekganda.vercel.app`

## Endpoint Utama

Satu-satunya endpoint yang tersedia saat ini adalah untuk melakukan pengecekan data akun.

### Cek Akun ML

Untuk mendapatkan detail akun, kirimkan permintaan GET ke endpoint berikut:

* **Method**: `GET`
* **Endpoint**: `/cekml`

#### Parameter Kueri (Query Parameters)

| Parameter | Tipe   | Deskripsi                              | Wajib? |
| :-------- | :----- | :--------------------------------------- | :----- |
| `id`      | String | ID Pengguna dari akun Mobile Legends.    | Ya     |
| `server`  | String | ID Server dari akun Mobile Legends.      | Ya     |

## Contoh Penggunaan

Berikut adalah cara menggunakan API ini melalui URL langsung atau `curl`.

#### 1. Melalui URL Browser

Anda bisa langsung mengakses URL berikut di browser Anda:

`https://mann-cekganda.vercel.app/cekml?id=283916287&server=9476`

#### 2. Menggunakan cURL

Anda juga dapat menggunakan `curl` di terminal atau command prompt:

`curl -X GET "https://mann-cekganda.vercel.app/cekml?id=283916287&server=9476"`

## Contoh Respons

Berikut adalah contoh respons yang akan Anda terima dari API.

#### ✅ Respons Sukses (200 OK)

Jika ID dan Server valid dan ditemukan, Anda akan menerima respons seperti ini:

```json
{
    "status": true,
    "creator": "Firman Evergarden ^_^",
    "data": {
        "id": "283916287",
        "server": "9476",
        "nickname": "「FE」ᴋ ɪ ʀ ɪ ɢ ᴀ ʏ ᴀ",
        "country_code": "ID",
        "country_name": "Indonesia 🇮🇩",
        "double_recharge": {
            "50+50": false,
            "150+150": false,
            "250+250": false,
            "500+500": false
        }
    }
}
