<?

function get_them($latitude,$longitude,$maxdistance=10) {

  $query = "
  SELECT
  p.ID, p.post_name, ((ACOS(SIN({$latitude} * PI() / 180) * SIN('latitude.meta_value' * PI() / 180) + COS({$latitude} * PI() / 180) * COS('latitude.meta_value' * PI() / 180) * COS(({$longitude} - 'longitude.meta_value') * PI() / 180)) * 180 / PI()) * 60 * 1.1515) AS distance
  FROM $wpdb->posts p
  LEFT JOIN $wpdb->postmeta latitude on latitude.post_id = p.ID and latitude.meta_key = 'oqp_geo_lat'
  LEFT JOIN $wpdb->postmeta longitude on longitude.post_id = p.ID and longitude.meta_key = 'oqp_geo_long'
  HAVING distance < {$maxdistance}";

  return $query;


}