export interface PointModel {
  /**
   * Name
   */
  name: string;

  /**
   * E-mail
   */
  email: string;

  /**
   * WhatsApp number
   */
  whatsapp: string;

  /**
   * UF
   */
  uf?: string;

  /**
   * City
   */
  city?: string;

  /**
   * Latitude
   */
  latitude?: number;

  /**
   * Longitude
   */
  longitude?: number;

  /**
   * Items
   */
  items: number[];
}
