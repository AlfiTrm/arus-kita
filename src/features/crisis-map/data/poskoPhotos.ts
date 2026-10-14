import type { Posko } from "../types/crisisMap.types";

type PoskoPhoto = Pick<
  Posko,
  "image_url" | "image_alt" | "image_caption" | "image_credit" | "image_source_url"
>;

export const POSKO_PHOTOS = {
  acehTamiang01: {
    image_url: "/images/posko/aceh-tamiang-posko-01.jpg",
    image_alt: "Kendaraan bantuan bersiap di salah satu posko penanggulangan bencana di Aceh Tamiang.",
    image_caption: "Aceh Tamiang · foto posko",
    image_credit: "Nasution007 · CC BY-SA 4.0",
    image_source_url:
      "https://commons.wikimedia.org/wiki/File:Salah_satu_posko_penanggulangan_bencana_di_Aceh_Tamiang.jpg",
  },
  padangPariaman: {
    image_url: "/images/posko/padang-pariaman-posko-2025.jpg",
    image_alt: "Kunjungan ke warga terdampak banjir di Padang Pariaman.",
    image_caption: "Padang Pariaman · 2025",
    image_credit: "Sekretariat Negara · domain publik",
    image_source_url:
      "https://commons.wikimedia.org/wiki/File:Presiden_Prabowo_Datang,_Mendengar,_dan_Bantu_Warga_Terdampak_Banjir_di_Padang_Pariaman.jpg",
  },
  lombokAid: {
    image_url: "/images/posko/lombok-earthquake-aid-2018.jpg",
    image_alt: "Bantuan makanan untuk warga terdampak gempa di Lombok.",
    image_caption: "Lombok · gempa · 2018",
    image_credit: "Kementerian Kominfo · domain publik",
    image_source_url: "https://commons.wikimedia.org/wiki/File:Food_aid_Lombok_earthquake.jpg",
  },
  acehFamily: {
    image_url: "/images/posko/aceh-family-tents-2005.jpg",
    image_alt: "Keluarga tinggal di tenda pengungsian setelah tsunami di Banda Aceh.",
    image_caption: "Banda Aceh · tsunami · 2005",
    image_credit: "U.S. Navy · domain publik",
    image_source_url:
      "https://commons.wikimedia.org/wiki/File:US_Navy_050215-N-8629M-091_An_Indonesian_family_is_left_without_a_home_after_the_Tsunami_struck_Banda_Aceh_on_the_island_of_Sumatra,_Indonesia._Families_are_living_out_of_tents_at_an_Internally_Displaced_Persons_(IDP)_camp_near.jpg",
  },
  acehRelief: {
    image_url: "/images/posko/aceh-relief-site-2005.jpg",
    image_alt: "Anak-anak di lokasi bantuan setelah tsunami Aceh.",
    image_caption: "Aceh · lokasi bantuan · 2005",
    image_credit: "USAID Indonesia · domain publik",
    image_source_url:
      "https://commons.wikimedia.org/wiki/File:Anak-anak_korban_bencana_tetap_gembira_meskipun_tinggal_di_tempat_pengungsian_setelah_tsunami_Aceh._(15358491314).jpg",
  },
  acehWater: {
    image_url: "/images/posko/aceh-camp-water-check-2005.jpg",
    image_alt: "Petugas memeriksa sampel air dari kamp pengungsi di Banda Aceh.",
    image_caption: "Banda Aceh · pemeriksaan air · 2005",
    image_credit: "U.S. Navy · domain publik",
    image_source_url:
      "https://commons.wikimedia.org/wiki/File:US_Navy_050307-N-6665R-048_Hospital_Corpsman_1st_Class_Loretta_Marbrey_tests_water_and_vector_samples_that_were_collected_from_an_internally_displaced_persons_camp_in_Banda_Aceh,_Indonesia.jpg",
  },
  mamujuLogistics: {
    image_url: "/images/posko/mamuju-earthquake-logistics-2021.jpg",
    image_alt: "Kapal KAL Mamuju berangkat membawa logistik bantuan setelah gempa di Sulawesi Barat.",
    image_caption: "Sulawesi Barat · logistik gempa · 2021",
    image_credit: "Dispen Lantamal VI · domain publik",
    image_source_url:
      "https://commons.wikimedia.org/wiki/File:KAL_Mamuju_departed_from_Makassar_January_2021.jpg",
  },
  sulawesiResponse: {
    image_url: "/images/posko/sulawesi-earthquake-response-2018.jpg",
    image_alt: "Petugas kemanusiaan membantu respons gempa dan tsunami di Sulawesi.",
    image_caption: "Sulawesi · gempa dan tsunami · 2018",
    image_credit: "Kedutaan Australia · CC BY 2.0",
    image_source_url:
      "https://commons.wikimedia.org/wiki/File:Dukungan_Australia_Menyusul_Gempa_Bumi_dan_Tsunami_Sulawesi.jpg",
  },
  westSumatra: {
    image_url: "/images/posko/west-sumatra-displacement-2025.jpg",
    image_alt: "Kunjungan ke posko pengungsian BNPB di Batang Anai, Padang Pariaman.",
    image_caption: "Batang Anai, Sumatera Barat · 2025",
    image_credit: "BNPB · domain publik",
    image_source_url:
      "https://commons.wikimedia.org/wiki/File:Presiden_Prabowo_Beri_Semangat_Warga_Sumbar_Terdampak_Bencana.webp",
  },
  semeruPost: {
    image_url: "/images/posko/semeru-evacuation-post-2021.jpg",
    image_alt: "Posko pengungsian warga terdampak erupsi Gunung Semeru di Lumajang.",
    image_caption: "Lumajang · erupsi Semeru · 2021",
    image_credit: "Medcom ID · CC BY 3.0",
    image_source_url:
      "https://commons.wikimedia.org/wiki/File:Jokowi_Kunjungi_Posko_Pengungsian_Korban_Erupsi_Semeru.jpg",
  },
  acehLhoKruet: {
    image_url: "/images/posko/aceh-lho-kruet-aid-2005.jpg",
    image_alt: "Warga Lho Kruet membawa bantuan pangan dan air ke kamp pengungsian.",
    image_caption: "Lho Kruet, Aceh · distribusi bantuan · 2005",
    image_credit: "U.S. Navy · domain publik",
    image_source_url:
      "https://commons.wikimedia.org/wiki/File:US_Navy_050116-N-0499M-182_Indonesian_locals_from_the_remote_village_of_Lho_Kruet_on_the_island_of_Sumatra,_Indonesia,_make_their_way_to_their_camp_after_being_issued_food_and_water.jpg",
  },
  northMaluku: {
    image_url: "/images/posko/north-maluku-earthquake-camp-2019.jpg",
    image_alt: "Tenda pengungsian yang didirikan pemerintah di Liboba Hijrah setelah gempa Maluku Utara.",
    image_caption: "Liboba Hijrah, Maluku Utara · gempa · 2019",
    image_credit: "BNPB · domain publik",
    image_source_url: "https://commons.wikimedia.org/wiki/File:Camps_of_the_14_July_2019_earthquake.jpg",
  },
  lombokConnectivity: {
    image_url: "/images/posko/lombok-camp-connectivity-2018.jpg",
    image_alt: "Petugas memasang sambungan internet untuk kamp pengungsi gempa Lombok.",
    image_caption: "Lombok · layanan kamp pengungsi · 2018",
    image_credit: "Kementerian Kominfo · domain publik",
    image_source_url: "https://commons.wikimedia.org/wiki/File:Refugee_Camp_Wifi.jpg",
  },
  merapiCamp: {
    image_url: "/images/posko/merapi-displacement-camp-2010.jpg",
    image_alt: "Kamp pengungsian warga terdampak erupsi Gunung Merapi.",
    image_caption: "Gunung Merapi · erupsi · 2010",
    image_credit: "DFAT / AusAID · CC BY 2.0",
    image_source_url:
      "https://commons.wikimedia.org/wiki/File:Displacement_camp_near_Mount_Merapi_(10693070073).jpg",
  },
  acehHealthcare: {
    image_url: "/images/posko/aceh-camp-healthcare-2005.jpg",
    image_alt: "Petugas kesehatan berdiskusi di fasilitas perawatan kamp pengungsi Banda Aceh.",
    image_caption: "Banda Aceh · layanan kesehatan pengungsi · 2005",
    image_credit: "U.S. Navy · domain publik",
    image_source_url:
      "https://commons.wikimedia.org/wiki/File:US_Navy_050215-N-8629M-011_Registered_Nurse_Diana_Speranza,_far_left,_and_Lt._Cmdr._Timothy_Jiggins,_left_center,_discuss_the_sanitary_conditions_of_a_care_facility_at_an_Internally_Displaced_Persons_(IDP)_camp_near_Banda_Aceh.jpg",
  },
  sabangCamp: {
    image_url: "/images/posko/aceh-sabang-camp-2005.jpg",
    image_alt: "Tampak udara kamp pengungsi di Sabang, Pulau We.",
    image_caption: "Sabang, Aceh · 2005",
    image_credit: "U.S. Navy · domain publik",
    image_source_url:
      "https://commons.wikimedia.org/wiki/File:US_Navy_050123-N-8801B-460_An_aerial_view_of_a_refugee_camp_in_the_city_of_Sabang_on_Pulau_We_Island,_Indonesia.jpg",
  },
  acehIdpCamp: {
    image_url: "/images/posko/aceh-idp-camp-2005.jpg",
    image_alt: "Warga di kamp pengungsi Banda Aceh menerima bantuan setelah tsunami.",
    image_caption: "Banda Aceh · bantuan pengungsi · 2005",
    image_credit: "U.S. Navy · domain publik",
    image_source_url:
      "https://commons.wikimedia.org/wiki/File:US_Navy_050214-N-0357S-071_A_group_of_Indonesians_living_in_a_camp_for_internally_displaced_persons_in_Banda_Aceh_on_the_island_of_Sumatra,_Indonesia,_reach_for_stuffed_animals_thrown_to_them_by_Sailors.jpg",
  },
  acehTamiang02: {
    image_url: "/images/posko/aceh-tamiang-posko-02.jpg",
    image_alt: "Kendaraan bantuan berhenti dan bersiap di posko bencana Aceh Tamiang.",
    image_caption: "Aceh Tamiang · foto posko",
    image_credit: "Nasution007 · CC BY-SA 4.0",
    image_source_url:
      "https://commons.wikimedia.org/wiki/File:Salah_satu_posko_penanggulangan_bencana_di_Aceh_Tamiang_02.jpg",
  },
} satisfies Record<string, PoskoPhoto>;

export type PoskoPhotoKey = keyof typeof POSKO_PHOTOS;
