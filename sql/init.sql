CREATE TABLE rezervacije (
  id INT AUTO_INCREMENT PRIMARY KEY,
  datum DATE NOT NULL,
  termin VARCHAR(5) NOT NULL,
  ime_prezime VARCHAR(100) NOT NULL,
  telefon VARCHAR(20) NOT NULL,
  marka VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  opis TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'nova',
  kreirano TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (datum, termin)
);

CREATE TABLE sesije (
  token VARCHAR(64) PRIMARY KEY,
  istice DATETIME NOT NULL
);

CREATE TABLE admin (
  id INT PRIMARY KEY AUTO_INCREMENT,
  korisnicko_ime VARCHAR(50) NOT NULL UNIQUE,
  lozinka VARCHAR(255) NOT NULL
);

-- korisnik: admin, lozinka: adminadmin123 (hashovana sa bcrypt)
INSERT INTO admin (korisnicko_ime, lozinka) VALUES
('admin', '$2b$10$f/4CzbdF2JCKDj3Pv1ptf.IBTneIhUNUZ32HwtR5gOal1JjIQqwCe');