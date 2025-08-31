create table name(
    id int primary key,
    title varchar(16),
    first_name varchar(255),
    middle_name varchar(255),
    last_name varchar(255),
    gender varchar(1),
    preferred_name varchar(255),
    maiden_name varchar(255)
);

create table address(
    id int primary key,
    primary_line varchar(255),
    secondary_line varchar(255),
    suburb varchar,
    city varchar,
    postcode varchar(4),
    region varchar(32),
    country_code varchar(3)
);

create table contact(
    id int primary key,
    landline_phone_no varchar(12),
    mobile_phone_no varchar(12),
    email varchar(255)
);

create table emergency_contact(
    id int primary key,
    name varchar(255),
    relation varchar(255),
    landline_phone_no varchar(12),
    mobile_phone_no varchar(12)
);

create table ethnicity (
    id int primary key,
    ethnicity varchar(128)
);

create table preferred_language (
    id int primary key,
    preferred_language varchar(128)
);

create table patients(
    id int primary key,
    nhi varchar(7),
    name int references name(id),
    date_of_birth timestamp,
    address int references address(id),
    contact int references contact(id),
    emergency_contact int references emergency_contact(id),
    ethnicity int references ethnicity(id),
    preferred_language int references preferred_language(id)
);

create table profession(
    id int primary key,
    name varchar(32)
);

create table staff(
    id int primary key,
    title varchar(4),
    name varchar(255),
    profession int references profession(id)
);

create table medications(
    id int primary key,
    name varchar(255),
    generic_name varchar(255),
    administer_method varchar(64)
);

create table prescriptions(
    id int primary key,
    date_prescribed timestamp,
    medication int references medications(id),
    dosage varchar(64),
    quantity varchar(64),
    frequency varchar(64),
    start_date timestamp,
    end_date timestamp,
    prescribers int references staff(id)
);


create table patients_prescriptions(
    patients_id int,
    prescriptions_id int,
    primary key (patients_id, prescriptions_id),
    foreign key (patients_id) references patients(id),
    foreign key (prescriptions_id) references prescriptions(id)
);


create table prescriptions_medications(
    prescriptions_id int references prescribers(id),
    medications_id int references medications(id),
    primary key (prescriptions_id, medications_id)
);


create table laboratory(
    id int primary key,
    name varchar(128)
);

create table status(
    id int primary key,
    name varchar(64)
);


create table blood_tests(
    id int primary key,
    type varchar(255),
    date timestamp,
    laboratory int references laboratory(id)
);

create table results(
    id int primary key,
    parameter varchar(64),
    value float,
    unit varchar(16),
    reference_range_low float,
    reference_range_high float,
    status varchar(16),
    blood_test_id int,
    foreign key (blood_test_id) references blood_tests(id)
);

create table patients_blood_tests(
    patients_id int references patients(id),
    blood_tests_id int references blood_tests(id),
    primary key (patients_id, blood_tests_id)
);

create table document_type(
    id int primary key,
    name varchar(16)
);

create table documents(
    id int primary key,
    document_type int references document_type(id),
    title varchar(128),
    description varchar(255),
    date date,
    author int references staff(id),
    content varchar,
    document bytea
);

create table patients_documents(
    patients_id int references patients(id),
    documents_id int references documents(id),
    primary key (patients_id, documents_id)
);

/*Queries*/
select patients.nhi, concat(n.first_name, ' ', n.middle_name, ' ', n.last_name), date_of_birth from patients
join name n
on patients.name = n.id;


/*Display patients*/
select
    patients.nhi,
    n.first_name, n.middle_name, n.last_name,
    concat_ws(' ', n.first_name, n.middle_name, n.last_name) as full_name,
    n.preferred_name,
    extract(year from age(date_of_birth)) as age,
    date_of_birth,
    n.gender,
    e.ethnicity,
    l.preferred_language,
    concat_ws(' ', a.primary_line, a.suburb, a.postcode, a.city, a.region) as full_address,
    concat_ws(' ', a.primary_line, a.secondary_line) as address,
    a.suburb,
    a.postcode,
    a.city,
    a.region,
    c.landline_phone_no,
    c.mobile_phone_no,
    c.email,
    ec.name as emergency_contact_name,
    ec.relation,
    ec.landline_phone_no as emergency_contact_landline,
    ec.mobile_phone_no as emergency_contact_mobile

from patients
join name n on patients.name = n.id
join ethnicity e on patients.ethnicity = e.id
join preferred_language l on patients.preferred_language = l.id
join contact c on patients.contact = c.id
join emergency_contact ec on patients.emergency_contact = ec.id
join address a on patients.address = a.id
where nhi = 'ZCM16EW';


/*Display patients blood tests*/
select patients.nhi, bt.id, bt.type, bt.date, lab.name, res.parameter, res.value, res.unit, concat(
  coalesce(res.reference_range_low::text, '0'),
  '-',
  coalesce(res.reference_range_high::text, '0'),
  ' ',
  res.unit
) as range, res.status
    from patients
    join patients_blood_tests pbt on patients.id = pbt.patients_id
    join blood_tests bt on pbt.blood_tests_id = bt.id
    join results res on bt.id = res.blood_test_id
    join laboratory lab on bt.laboratory = lab.id
where nhi = 'ZCM16EW';


/*Display patients prescriptions*/
select patients.nhi, pre.id, med.generic_name, pre.dosage, med.administer_method,  concat(stf.title, ' ',stf.name) as name, pre.date_prescribed, pre.start_date, pre.end_date
    from patients
    join patients_prescriptions pp on patients.id = pp.patients_id
    join prescriptions pre on pp.prescriptions_id = pre.id
    join medications med on pre.medication = med.id
    join staff stf on pre.prescribers = stf.id
where nhi = 'ZCM16EW' and pre.end_date >= current_date;

/*Display patients documents*/
select patients.nhi, docs.id, docs.title, docs.description, concat(stf.title, ' ',stf.name), docs.date, docs.content, docs.document
    from patients
    join patients_documents pd on patients.id = pd.patients_id
    join documents docs on pd.documents_id = docs.id
    join staff stf on docs.author = stf.id
where nhi = 'ZCM16EW';




/*Inserts*/

INSERT INTO public.patients (id, nhi, name, date_of_birth, address, contact, emergency_contact, ethnicity, preferred_language) VALUES (1, 'ZAK21MS', 1, '1986-02-08', 1, 1, 17, 12, 1);
INSERT INTO public.patients (id, nhi, name, date_of_birth, address, contact, emergency_contact, ethnicity, preferred_language) VALUES (2, 'ZAP28LA', 2, '1992-11-19', 2, 2, 6, 12, 2);
INSERT INTO public.patients (id, nhi, name, date_of_birth, address, contact, emergency_contact, ethnicity, preferred_language) VALUES (3, 'ZBD33XL', 3, '1976-08-11', 3, 3, 10, 12, 1);
INSERT INTO public.patients (id, nhi, name, date_of_birth, address, contact, emergency_contact, ethnicity, preferred_language) VALUES (4, 'ZBJ59LE', 4, '1984-08-18', 4, 4, 1, 12, 1);
INSERT INTO public.patients (id, nhi, name, date_of_birth, address, contact, emergency_contact, ethnicity, preferred_language) VALUES (5, 'ZBK58TM', 5, '1982-10-15', 5, 5, 37, 12, 1);
INSERT INTO public.patients (id, nhi, name, date_of_birth, address, contact, emergency_contact, ethnicity, preferred_language) VALUES (6, 'ZBS45LD', 6, '1975-09-28', 6, 6, 39, 10, 1);
INSERT INTO public.patients (id, nhi, name, date_of_birth, address, contact, emergency_contact, ethnicity, preferred_language) VALUES (7, 'ZCL47UF', 7, '2007-07-14', 7, 7, 9, 17, 1);
INSERT INTO public.patients (id, nhi, name, date_of_birth, address, contact, emergency_contact, ethnicity, preferred_language) VALUES (8, 'ZCL83GC', 8, '1980-10-09', 8, 8, 35, 6, 1);
INSERT INTO public.patients (id, nhi, name, date_of_birth, address, contact, emergency_contact, ethnicity, preferred_language) VALUES (9, 'ZCM16EW', 9, '1997-02-15', 9, 9, 34, 12, 1);
INSERT INTO public.patients (id, nhi, name, date_of_birth, address, contact, emergency_contact, ethnicity, preferred_language) VALUES (10, 'ZDJ24ZS', 10, '1984-07-02', 10, 10, 20, 12, 1);
INSERT INTO public.patients (id, nhi, name, date_of_birth, address, contact, emergency_contact, ethnicity, preferred_language) VALUES (11, 'ZDP92ZR', 11, '1995-10-01', 11, 11, 15, 12, 1);
INSERT INTO public.patients (id, nhi, name, date_of_birth, address, contact, emergency_contact, ethnicity, preferred_language) VALUES (12, 'ZES76BM', 12, '2000-03-02', 12, 12, 14, 12, 1);
INSERT INTO public.patients (id, nhi, name, date_of_birth, address, contact, emergency_contact, ethnicity, preferred_language) VALUES (13, 'ZFE35PQ', 13, '1995-09-03', 13, 13, 2, 3, 1);
INSERT INTO public.patients (id, nhi, name, date_of_birth, address, contact, emergency_contact, ethnicity, preferred_language) VALUES (14, 'ZFZ57UL', 14, '1986-12-30', 14, 14, 5, 25, 2);
INSERT INTO public.patients (id, nhi, name, date_of_birth, address, contact, emergency_contact, ethnicity, preferred_language) VALUES (15, 'ZGA02YJ', 15, '1978-08-30', 15, 15, 35, 12, 1);

INSERT INTO public.address (id, primary_line, secondary_line, suburb, city, postcode, region, country_code) VALUES (1, '66 Manukau Road', '', 'Hamilton Lake', 'Hamilton', '3204', 'Waikato', 'nz');
INSERT INTO public.address (id, primary_line, secondary_line, suburb, city, postcode, region, country_code) VALUES (2, '236 Madras Street', '', 'Riccarton', 'Christchurch', '8041', 'Canterbury', 'nz');
INSERT INTO public.address (id, primary_line, secondary_line, suburb, city, postcode, region, country_code) VALUES (3, '240 King Street', '', 'Ponsonby', 'Auckland', '1011', 'Auckland', 'nz');
INSERT INTO public.address (id, primary_line, secondary_line, suburb, city, postcode, region, country_code) VALUES (4, '103 Durham Street', '', 'Ponsonby', 'Auckland', '1011', 'Auckland', 'nz');
INSERT INTO public.address (id, primary_line, secondary_line, suburb, city, postcode, region, country_code) VALUES (5, '95 Clyde Road', '', 'Hamilton Lake', 'Hamilton', '3204', 'Waikato', 'nz');
INSERT INTO public.address (id, primary_line, secondary_line, suburb, city, postcode, region, country_code) VALUES (6, '136 Great North Road', '', 'Christchurch Central', 'Christchurch', '8011', 'Canterbury', 'nz');
INSERT INTO public.address (id, primary_line, secondary_line, suburb, city, postcode, region, country_code) VALUES (7, '130 King Street', '', 'St Albans', 'Christchurch', '8014', 'Canterbury', 'nz');
INSERT INTO public.address (id, primary_line, secondary_line, suburb, city, postcode, region, country_code) VALUES (8, '61 Madras Street', '', 'Riccarton', 'Christchurch', '8041', 'Canterbury', 'nz');
INSERT INTO public.address (id, primary_line, secondary_line, suburb, city, postcode, region, country_code) VALUES (9, '297 Great North Road', '', 'Mosgiel', 'Dunedin', '9024', 'Otago', 'nz');
INSERT INTO public.address (id, primary_line, secondary_line, suburb, city, postcode, region, country_code) VALUES (10, '26 Lincoln Road', '', 'St Albans', 'Christchurch', '8014', 'Canterbury', 'nz');
INSERT INTO public.address (id, primary_line, secondary_line, suburb, city, postcode, region, country_code) VALUES (11, '292 Main Road', '', 'Mosgiel', 'Dunedin', '9024', 'Otago', 'nz');
INSERT INTO public.address (id, primary_line, secondary_line, suburb, city, postcode, region, country_code) VALUES (12, '115 Manukau Road', '', 'Newtown', 'Wellington', '6021', 'Wellington', 'nz');
INSERT INTO public.address (id, primary_line, secondary_line, suburb, city, postcode, region, country_code) VALUES (13, '110 Lambton Quay', '', 'Hamilton Lake', 'Hamilton', '3204', 'Waikato', 'nz');
INSERT INTO public.address (id, primary_line, secondary_line, suburb, city, postcode, region, country_code) VALUES (14, '48 Cuba Street', '', 'Riccarton', 'Christchurch', '8041', 'Canterbury', 'nz');
INSERT INTO public.address (id, primary_line, secondary_line, suburb, city, postcode, region, country_code) VALUES (15, '99 Lincoln Road', '', 'Hamilton Lake', 'Hamilton', '3204', 'Waikato', 'nz');

INSERT INTO public.contact (id, landline_phone_no, mobile_phone_no, email) VALUES (1, '36470272', '22879826', 'Ava-7Lilac@gmail.com');
INSERT INTO public.contact (id, landline_phone_no, mobile_phone_no, email) VALUES (2, '72193396', '29428972', null);
INSERT INTO public.contact (id, landline_phone_no, mobile_phone_no, email) VALUES (3, null, '27851285', 'Alex-8Harris@xtra.co.nz');
INSERT INTO public.contact (id, landline_phone_no, mobile_phone_no, email) VALUES (4, '74081454', '28880153', 'James-5Scott@hotmal.com');
INSERT INTO public.contact (id, landline_phone_no, mobile_phone_no, email) VALUES (5, null, '27840978', 'Olivia-6Grace@outlook.com');
INSERT INTO public.contact (id, landline_phone_no, mobile_phone_no, email) VALUES (6, '60419058', '22014077', null);
INSERT INTO public.contact (id, landline_phone_no, mobile_phone_no, email) VALUES (7, null, '28133564', null);
INSERT INTO public.contact (id, landline_phone_no, mobile_phone_no, email) VALUES (8, null, '21434855', 'Taylor-12Zane@icloud.com');
INSERT INTO public.contact (id, landline_phone_no, mobile_phone_no, email) VALUES (9, null, '21110943', 'Benjamin-13Lila@me.com');
INSERT INTO public.contact (id, landline_phone_no, mobile_phone_no, email) VALUES (10, '37171361', '28338170', 'Matthew-14Ethan@protonmail.ch');
INSERT INTO public.contact (id, landline_phone_no, mobile_phone_no, email) VALUES (11, '99057570', '21579704', 'Olivia-15Hunter@fastmail.fm');
INSERT INTO public.contact (id, landline_phone_no, mobile_phone_no, email) VALUES (12, null, '21310240', 'Noah-16Felix@digitalocean.com');
INSERT INTO public.contact (id, landline_phone_no, mobile_phone_no, email) VALUES (13, null, '27615189', null);
INSERT INTO public.contact (id, landline_phone_no, mobile_phone_no, email) VALUES (14, '77529574', '28222898', 'Jordan-18Tait@googlemail.com');
INSERT INTO public.contact (id, landline_phone_no, mobile_phone_no, email) VALUES (15, null, '22592554', null);

INSERT INTO public.emergency_contact (id, name, relation, landline_phone_no, mobile_phone_no) VALUES (1, 'John Doe', 'Parent', '', '+64 123 456 ');
INSERT INTO public.emergency_contact (id, name, relation, landline_phone_no, mobile_phone_no) VALUES (2, 'Jane Smith', 'Partner', ' ', '+64 987 654 ');
INSERT INTO public.emergency_contact (id, name, relation, landline_phone_no, mobile_phone_no) VALUES (3, 'Emily Williams', 'Guardian', '', '+64 498 765 ');
INSERT INTO public.emergency_contact (id, name, relation, landline_phone_no, mobile_phone_no) VALUES (4, 'Michael Taylor', 'Work', '', '+64 887 654 ');
INSERT INTO public.emergency_contact (id, name, relation, landline_phone_no, mobile_phone_no) VALUES (5, 'Sophia Davies', 'Family Member', '+64 798 654 ', '');
INSERT INTO public.emergency_contact (id, name, relation, landline_phone_no, mobile_phone_no) VALUES (6, 'Noah Harris', 'Parent', '+64 123 456 ', '+64 887 498 ');
INSERT INTO public.emergency_contact (id, name, relation, landline_phone_no, mobile_phone_no) VALUES (7, 'Olivia Johnson', 'Partner', '+64 987 654 ', '+64 987 456 ');
INSERT INTO public.emergency_contact (id, name, relation, landline_phone_no, mobile_phone_no) VALUES (8, 'Ava Wright', 'Guardian', '', '+64 498 456 ');
INSERT INTO public.emergency_contact (id, name, relation, landline_phone_no, mobile_phone_no) VALUES (9, 'Ethan Hicks', 'Work', '+64 887 654 ', '');
INSERT INTO public.emergency_contact (id, name, relation, landline_phone_no, mobile_phone_no) VALUES (10, 'Aria Brown', 'Family Member', '+64 798 654 ', '+64 798 456 ');
INSERT INTO public.emergency_contact (id, name, relation, landline_phone_no, mobile_phone_no) VALUES (11, 'Liam Miller', 'Parent', '+64 123 456 ', '+64 123 456 ');
INSERT INTO public.emergency_contact (id, name, relation, landline_phone_no, mobile_phone_no) VALUES (12, 'Amara Anderson', 'Partner', '', '+64 987 456 ');
INSERT INTO public.emergency_contact (id, name, relation, landline_phone_no, mobile_phone_no) VALUES (13, 'Ezra Hughes', 'Guardian', '+64 498 765 ', '+64 498 456 ');
INSERT INTO public.emergency_contact (id, name, relation, landline_phone_no, mobile_phone_no) VALUES (14, 'Aiden Brown', 'Work', '+64 887 654 ', '');
INSERT INTO public.emergency_contact (id, name, relation, landline_phone_no, mobile_phone_no) VALUES (15, 'Mila Hendricks', 'Family Member', '+64 798 654 ', '+64 798 654 ');

INSERT INTO public.ethnicity (id, ethnicity) VALUES (1, 'African');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (2, 'Asian nfd');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (3, 'Chinese');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (4, 'Cook Islands Maori');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (5, 'Don’t Know');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (6, 'European nfd');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (7, 'Fijian');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (8, 'Indian');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (9, 'Latin American');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (10, 'Māori');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (11, 'Middle Eastern');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (12, 'New Zealand European');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (13, 'Niuean');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (14, 'Not Stated');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (15, 'Other Asian');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (16, 'Other Ethnicity');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (17, 'Other European');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (18, 'Other Pacific Peoples');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (19, 'Pacific Peoples nfd');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (20, 'Refused to Answer');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (21, 'Repeated Value');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (22, 'Response Outside Scope');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (23, 'Response Unidentifiable');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (24, 'Samoan');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (25, 'Southeast Asian');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (26, 'Tokelauan');
INSERT INTO public.ethnicity (id, ethnicity) VALUES (27, 'Tongan');

INSERT INTO public.name (id, title, first_name, middle_name, last_name, gender, preferred_name, maiden_name) VALUES (1, 'Ms', 'Ava', 'Grace', 'Lila', 'F', null, null);
INSERT INTO public.name (id, title, first_name, middle_name, last_name, gender, preferred_name, maiden_name) VALUES (2, 'Mr', 'Eliot', 'Kia', 'Tait', 'M', null, null);
INSERT INTO public.name (id, title, first_name, middle_name, last_name, gender, preferred_name, maiden_name) VALUES (3, null, 'Alex', 'Carter', 'Harris', 'M', null, null);
INSERT INTO public.name (id, title, first_name, middle_name, last_name, gender, preferred_name, maiden_name) VALUES (4, 'Mr', 'James', 'Michael', 'Scott', 'M', null, null);
INSERT INTO public.name (id, title, first_name, middle_name, last_name, gender, preferred_name, maiden_name) VALUES (5, 'Ms', 'Olivia', 'Noah', 'Grace', 'F', null, null);
INSERT INTO public.name (id, title, first_name, middle_name, last_name, gender, preferred_name, maiden_name) VALUES (6, null, 'Noah', 'Emily', 'Samuel', 'U', null, null);
INSERT INTO public.name (id, title, first_name, middle_name, last_name, gender, preferred_name, maiden_name) VALUES (7, null, 'Jordan', 'Frank', 'Michael', 'M', null, null);
INSERT INTO public.name (id, title, first_name, middle_name, last_name, gender, preferred_name, maiden_name) VALUES (8, 'Ms', 'Taylor', 'Aviva', 'Zane', 'F', null, null);
INSERT INTO public.name (id, title, first_name, middle_name, last_name, gender, preferred_name, maiden_name) VALUES (9, 'Mr', 'Benjamin', 'Aaron', 'Lila', 'M', null, null);
INSERT INTO public.name (id, title, first_name, middle_name, last_name, gender, preferred_name, maiden_name) VALUES (10, 'Mr', 'Matthew', 'Brooke', 'Ethan', 'M', null, null);
INSERT INTO public.name (id, title, first_name, middle_name, last_name, gender, preferred_name, maiden_name) VALUES (11, null, 'Olivia', 'Daniel', 'Hunter', 'U', null, null);
INSERT INTO public.name (id, title, first_name, middle_name, last_name, gender, preferred_name, maiden_name) VALUES (12, 'Mr', 'Noah', 'Morgan', 'Felix', 'M', null, null);
INSERT INTO public.name (id, title, first_name, middle_name, last_name, gender, preferred_name, maiden_name) VALUES (13, 'Mr', 'Mia', 'Carter', 'Aurora', 'M', null, null);
INSERT INTO public.name (id, title, first_name, middle_name, last_name, gender, preferred_name, maiden_name) VALUES (14, 'Mrs', 'Jordan', 'Te Hīnāpapa', 'Tait', 'F', null, null);
INSERT INTO public.name (id, title, first_name, middle_name, last_name, gender, preferred_name, maiden_name) VALUES (15, 'Mrs', 'Jordan', 'Grace', 'Seraphina', 'F', null, null);

INSERT INTO public.preferred_language (id, preferred_language) VALUES (1, 'English');
INSERT INTO public.preferred_language (id, preferred_language) VALUES (2, 'Te Reo Māori');
INSERT INTO public.preferred_language (id, preferred_language) VALUES (3, 'Samoan');
INSERT INTO public.preferred_language (id, preferred_language) VALUES (4, 'Northern Chinese');
INSERT INTO public.preferred_language (id, preferred_language) VALUES (5, 'Hindi');
INSERT INTO public.preferred_language (id, preferred_language) VALUES (6, 'French');
INSERT INTO public.preferred_language (id, preferred_language) VALUES (7, 'Yue');
INSERT INTO public.preferred_language (id, preferred_language) VALUES (8, 'Sinitic');
INSERT INTO public.preferred_language (id, preferred_language) VALUES (9, 'Tagalog');
INSERT INTO public.preferred_language (id, preferred_language) VALUES (10, 'German');
INSERT INTO public.preferred_language (id, preferred_language) VALUES (11, 'Spanish');
INSERT INTO public.preferred_language (id, preferred_language) VALUES (12, 'Afrikaans');
INSERT INTO public.preferred_language (id, preferred_language) VALUES (13, 'Tongan');
INSERT INTO public.preferred_language (id, preferred_language) VALUES (14, 'Punjabi');
INSERT INTO public.preferred_language (id, preferred_language) VALUES (15, 'Korean');
INSERT INTO public.preferred_language (id, preferred_language) VALUES (16, 'Fiji Hindi');
INSERT INTO public.preferred_language (id, preferred_language) VALUES (17, 'Japanese');
INSERT INTO public.preferred_language (id, preferred_language) VALUES (18, 'Dutch');
INSERT INTO public.preferred_language (id, preferred_language) VALUES (19, 'New Zealand Sign Language');
INSERT INTO public.preferred_language (id, preferred_language) VALUES (20, 'Gujarati');

INSERT INTO public.status (id, name) VALUES (1, 'In Progress');
INSERT INTO public.status (id, name) VALUES (2, 'Complete');
INSERT INTO public.status (id, name) VALUES (3, 'Inclusive');

INSERT INTO public.staff (id, title, name, profession) VALUES (1, 'Dr', 'Aroha Patel', 1);
INSERT INTO public.staff (id, title, name, profession) VALUES (2, 'Dr', 'Rohan Te Rangi', 1);
INSERT INTO public.staff (id, title, name, profession) VALUES (3, 'Dr', 'Priya Clarke', 1);
INSERT INTO public.staff (id, title, name, profession) VALUES (4, 'Dr', 'Wiremu Sharma', 1);
INSERT INTO public.staff (id, title, name, profession) VALUES (5, 'Dr', 'Anika Thompson', 1);
INSERT INTO public.staff (id, title, name, profession) VALUES (6, 'Dr', 'Harpreet Ngatai', 1);
INSERT INTO public.staff (id, title, name, profession) VALUES (7, 'Dr', 'Moana Singh', 1);
INSERT INTO public.staff (id, title, name, profession) VALUES (8, 'Dr', 'James Kaur', 1);
INSERT INTO public.staff (id, title, name, profession) VALUES (9, 'Dr', 'Mereana Joshi', 1);
INSERT INTO public.staff (id, title, name, profession) VALUES (10, 'Dr', 'Arjun Wainui', 1);
INSERT INTO public.staff (id, title, name, profession) VALUES (11, 'Dr', 'Charlotte Desai', 1);
INSERT INTO public.staff (id, title, name, profession) VALUES (12, 'Dr', 'Tāne Kapoor', 1);
INSERT INTO public.staff (id, title, name, profession) VALUES (13, 'Dr', 'Neha Rawiri', 1);
INSERT INTO public.staff (id, title, name, profession) VALUES (14, 'Dr', 'Hemi Mehta', 1);
INSERT INTO public.staff (id, title, name, profession) VALUES (15, 'Dr', 'Grace Reddy', 1);
INSERT INTO public.staff (id, title, name, profession) VALUES (16, 'Dr', 'Rereahu Bhatt', 1);
INSERT INTO public.staff (id, title, name, profession) VALUES (17, 'Dr', 'Isla Choudhury', 1);
INSERT INTO public.staff (id, title, name, profession) VALUES (18, 'Dr', 'Rajiv Te Ao', 1);
INSERT INTO public.staff (id, title, name, profession) VALUES (19, 'Dr', 'Hinemoa Verma', 1);
INSERT INTO public.staff (id, title, name, profession) VALUES (20, 'Dr', 'Liam Anand', 1);

INSERT INTO public.laboratory (id, name) VALUES (1, 'Labtests Auckland');
INSERT INTO public.laboratory (id, name) VALUES (2, 'Northland Pathology');
INSERT INTO public.laboratory (id, name) VALUES (3, 'Pathlab');
INSERT INTO public.laboratory (id, name) VALUES (4, 'Taranaki Pathology Services');
INSERT INTO public.laboratory (id, name) VALUES (5, 'Medlab Central');
INSERT INTO public.laboratory (id, name) VALUES (6, 'Hawke’s Bay SCL');
INSERT INTO public.laboratory (id, name) VALUES (7, 'Wellington SCL');
INSERT INTO public.laboratory (id, name) VALUES (8, 'Canterbury SCL');
INSERT INTO public.laboratory (id, name) VALUES (9, 'Medlab South');
INSERT INTO public.laboratory (id, name) VALUES (10, 'Southern Community Laboratories');
INSERT INTO public.laboratory (id, name) VALUES (11, 'Greymouth Phlebotomy Services');
INSERT INTO public.laboratory (id, name) VALUES (12, 'Awanui Labs');

select patients.id, patients.nhi, patients.date_of_birth, concat_ws(' ', a.primary_line, a.suburb, a.postcode, a.city, a.region)  from patients
join address a on patients.address = a.id;

INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (5, 'Liver Function Panel', '1995-03-12 00:00:00.000000', 10);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (22, 'Lipid Panel', '1999-07-25 00:00:00.000000', 10);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (23, 'HbA1c', '2004-11-03 00:00:00.000000', 10);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (24, 'Iron Studies', '2009-04-18 00:00:00.000000', 10);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (25, 'Vitamin D', '2014-09-30 00:00:00.000000', 10);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (26, 'Complete Blood Count (CBC)', '2019-09-14 00:00:00.000000', 10);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (27, 'Blood Glucose', '2025-06-01 00:00:00.000000', 10);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (31, 'Liver Function Panel', '2010-06-15 00:00:00.000000', 12);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (32, 'Lipid Panel', '2013-09-22 00:00:00.000000', 12);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (33, 'HbA1c', '2016-11-05 00:00:00.000000', 12);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (34, 'Thyroid Function Panel', '2019-03-18 00:00:00.000000', 12);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (35, 'Vitamin B12', '2022-07-09 00:00:00.000000', 12);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (36, 'Complete Blood Count (CBC)', '2025-05-12 00:00:00.000000', 12);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (41, 'Liver Function Panel', '2014-03-10 00:00:00.000000', 11);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (42, 'Lipid Panel', '2017-08-21 00:00:00.000000', 11);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (43, 'HbA1c', '2020-12-02 00:00:00.000000', 11);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (44, 'Vitamin D', '2023-05-17 00:00:00.000000', 11);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (45, 'Complete Blood Count (CBC)', '2025-07-28 00:00:00.000000', 11);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (51, 'Liver Function Panel', '2000-04-12 00:00:00.000000', 8);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (52, 'Lipid Panel', '2005-09-30 00:00:00.000000', 8);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (53, 'HbA1c', '2010-02-18 00:00:00.000000', 8);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (54, 'Iron Studies', '2013-07-25 00:00:00.000000', 8);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (55, 'Thyroid Function Panel', '2016-11-03 00:00:00.000000', 8);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (56, 'Vitamin D', '2020-06-14 00:00:00.000000', 8);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (57, 'Complete Blood Count (CBC)', '2025-07-01 00:00:00.000000', 8);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (61, 'Liver Function Panel', '2006-05-22 00:00:00.000000', 6);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (62, 'Lipid Panel', '2010-10-03 00:00:00.000000', 6);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (63, 'HbA1c', '2014-12-19 00:00:00.000000', 6);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (64, 'Iron Studies', '2018-08-07 00:00:00.000000', 6);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (65, 'Vitamin D', '2022-03-15 00:00:00.000000', 6);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (66, 'Complete Blood Count (CBC)', '2025-06-20 00:00:00.000000', 6);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (71, 'Liver Function Panel', '2005-02-14 00:00:00.000000', 5);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (72, 'Lipid Panel', '2009-06-30 00:00:00.000000', 5);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (73, 'HbA1c', '2013-11-22 00:00:00.000000', 5);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (74, 'Iron Studies', '2017-04-09 00:00:00.000000', 5);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (75, 'Vitamin D', '2021-08-16 00:00:00.000000', 5);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (76, 'Complete Blood Count (CBC)', '2025-07-10 00:00:00.000000', 5);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (81, 'Liver Function Panel', '1999-11-03 00:00:00.000000', 4);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (82, 'Lipid Panel', '2004-06-27 00:00:00.000000', 4);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (83, 'HbA1c', '2009-03-15 00:00:00.000000', 4);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (84, 'Iron Studies', '2013-08-22 00:00:00.000000', 4);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (85, 'Thyroid Function Panel', '2017-12-05 00:00:00.000000', 4);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (86, 'Vitamin D', '2021-10-18 00:00:00.000000', 4);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (87, 'Complete Blood Count (CBC)', '2025-07-30 00:00:00.000000', 4);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (91, 'Liver Function Panel', '2022-01-10 00:00:00.000000', 3);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (92, 'Lipid Panel', '2023-03-05 00:00:00.000000', 3);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (93, 'HbA1c', '2024-06-18 00:00:00.000000', 3);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (94, 'Complete Blood Count (CBC)', '2025-07-25 00:00:00.000000', 3);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (102, 'Lipid Panel', '2008-05-30 00:00:00.000000', 2);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (103, 'HbA1c', '2012-09-14 00:00:00.000000', 2);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (104, 'Iron Studies', '2016-03-22 00:00:00.000000', 2);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (105, 'Vitamin D', '2020-07-11 00:00:00.000000', 2);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (106, 'Complete Blood Count (CBC)', '2025-07-29 00:00:00.000000', 2);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (101, 'Liver Function Panel', '2004-01-19 00:00:00.000000', 2);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (111, 'Liver Function Panel', '2018-02-20 00:00:00.000000', 1);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (112, 'Lipid Panel', '2020-06-14 00:00:00.000000', 1);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (113, 'HbA1c', '2022-10-05 00:00:00.000000', 1);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (114, 'Vitamin D', '2024-03-17 00:00:00.000000', 1);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (115, 'Complete Blood Count (CBC)', '2025-07-26 00:00:00.000000', 1);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (121, 'Liver Function Panel', '2006-03-08 00:00:00.000000', 10);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (122, 'Lipid Panel', '2010-07-19 00:00:00.000000', 10);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (123, 'HbA1c', '2014-11-25 00:00:00.000000', 10);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (124, 'Iron Studies', '2018-09-02 00:00:00.000000', 10);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (125, 'Vitamin D', '2022-04-14 00:00:00.000000', 10);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (126, 'Complete Blood Count (CBC)', '2025-07-27 00:00:00.000000', 10);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (131, 'Liver Function Panel', '2016-04-11 00:00:00.000000', 9);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (132, 'Lipid Panel', '2018-09-23 00:00:00.000000', 9);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (133, 'HbA1c', '2021-01-30 00:00:00.000000', 9);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (134, 'Vitamin D', '2023-06-12 00:00:00.000000', 9);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (135, 'Complete Blood Count (CBC)', '2025-07-28 00:00:00.000000', 9);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (141, 'Liver Function Panel', '2017-05-08 00:00:00.000000', 7);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (142, 'Lipid Panel', '2019-09-14 00:00:00.000000', 7);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (143, 'HbA1c', '2021-12-03 00:00:00.000000', 7);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (144, 'Vitamin D', '2023-08-20 00:00:00.000000', 7);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (145, 'Complete Blood Count (CBC)', '2025-07-29 00:00:00.000000', 7);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (151, 'Liver Function Panel', '2015-03-12 00:00:00.000000', 12);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (152, 'Lipid Panel', '2017-07-25 00:00:00.000000', 12);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (153, 'HbA1c', '2020-11-03 00:00:00.000000', 12);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (154, 'Vitamin D', '2023-04-18 00:00:00.000000', 12);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (155, 'Complete Blood Count (CBC)', '2025-07-30 00:00:00.000000', 12);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (161, 'Liver Function Panel', '2008-02-11 00:00:00.000000', 6);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (162, 'Lipid Panel', '2012-06-30 00:00:00.000000', 6);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (163, 'HbA1c', '2016-10-19 00:00:00.000000', 6);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (164, 'Iron Studies', '2020-03-08 00:00:00.000000', 6);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (165, 'Vitamin D', '2023-07-14 00:00:00.000000', 6);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (166, 'Complete Blood Count (CBC)', '2025-07-30 00:00:00.000000', 6);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (171, 'Liver Function Panel', '2002-04-10 00:00:00.000000', 11);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (172, 'Lipid Panel', '2006-09-28 00:00:00.000000', 11);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (173, 'HbA1c', '2011-01-16 00:00:00.000000', 11);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (174, 'Iron Studies', '2014-07-05 00:00:00.000000', 11);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (175, 'Thyroid Function Panel', '2018-03-22 00:00:00.000000', 11);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (176, 'Vitamin D', '2022-06-11 00:00:00.000000', 11);
INSERT INTO public.blood_tests (id, type, date, laboratory) VALUES (177, 'Complete Blood Count (CBC)', '2025-08-30 00:00:00.000000', 11);


INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (1, 35);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (1, 36);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (1, 31);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (1, 32);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (1, 33);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (1, 34);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (2, 45);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (2, 44);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (2, 43);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (2, 42);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (2, 41);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (3, 56);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (3, 51);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (3, 52);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (3, 53);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (3, 54);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (3, 55);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (3, 57);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (4, 61);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (4, 62);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (4, 63);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (4, 64);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (4, 65);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (4, 66);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (5, 76);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (5, 71);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (5, 72);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (5, 73);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (5, 74);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (5, 75);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (6, 87);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (6, 81);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (6, 82);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (6, 83);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (6, 84);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (6, 85);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (6, 86);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (7, 93);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (7, 91);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (7, 92);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (7, 94);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (8, 101);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (8, 106);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (8, 105);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (8, 104);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (8, 103);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (8, 102);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (9, 114);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (9, 111);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (9, 112);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (9, 113);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (9, 115);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (10, 125);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (10, 121);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (10, 126);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (10, 122);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (10, 123);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (10, 124);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (11, 133);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (11, 135);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (11, 131);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (11, 132);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (11, 134);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (12, 144);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (12, 145);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (12, 141);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (12, 142);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (12, 143);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (13, 154);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (13, 151);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (13, 152);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (13, 153);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (13, 155);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (14, 162);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (14, 161);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (14, 166);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (14, 164);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (14, 165);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (14, 163);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (15, 171);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (15, 175);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (15, 176);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (15, 177);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (15, 172);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (15, 173);
INSERT INTO public.patients_blood_tests (patients_id, blood_tests_id) VALUES (15, 174);

INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (1, 'ALT', 32, 'U/L', 7, 56, 'Normal', 5);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (2, 'AST', 28, 'U/L', 10, 40, 'Normal', 5);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (3, 'ALP', 110, 'U/L', 44, 147, 'Normal', 5);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (4, 'Total Cholesterol', 6.2, 'mmol/L', null, 5.2, 'High', 22);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (5, 'HDL', 1.4, 'mmol/L', 1, null, 'Normal', 22);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (6, 'LDL', 4.1, 'mmol/L', null, 3.4, 'High', 22);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (7, 'Triglycerides', 1.8, 'mmol/L', null, 1.7, 'High', 22);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (8, 'HbA1c', 5.8, '%', 4, 5.6, 'Borderline', 23);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (9, 'Ferritin', 85, 'µg/L', 30, 400, 'Normal', 24);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (10, 'Serum Iron', 14, 'µmol/L', 10, 30, 'Normal', 24);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (11, 'TIBC', 58, 'µmol/L', 45, 70, 'Normal', 24);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (12, '25(OH)D', 42, 'nmol/L', 50, null, 'Low', 25);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (13, 'Hemoglobin', 135, 'g/L', 130, 180, 'Normal', 26);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (14, 'WBC', 6.2, 'x10⁹/L', 4, 11, 'Normal', 26);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (15, 'Platelets', 210, 'x10⁹/L', 150, 400, 'Normal', 26);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (16, 'Fasting Glucose', 5.4, 'mmol/L', 3.9, 5.5, 'Normal', 27);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (17, 'ALT', 29, 'U/L', 7, 56, 'Normal', 31);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (18, 'AST', 33, 'U/L', 10, 40, 'Normal', 31);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (19, 'ALP', 102, 'U/L', 44, 147, 'Normal', 31);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (20, 'Total Cholesterol', 5.9, 'mmol/L', null, 5.2, 'High', 32);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (21, 'HDL', 1.6, 'mmol/L', 1, null, 'Normal', 32);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (22, 'LDL', 3.9, 'mmol/L', null, 3.4, 'High', 32);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (23, 'Triglycerides', 1.5, 'mmol/L', null, 1.7, 'Normal', 32);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (24, 'HbA1c', 5.5, '%', 4, 5.6, 'Normal', 33);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (25, 'TSH', 2.1, 'mIU/L', 0.4, 4, 'Normal', 34);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (26, 'Free T4', 14.2, 'pmol/L', 9, 19, 'Normal', 34);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (27, 'Free T3', 4.8, 'pmol/L', 3.1, 6.8, 'Normal', 34);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (28, 'Vitamin B12', 310, 'pmol/L', 140, 700, 'Normal', 35);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (29, 'Hemoglobin', 138, 'g/L', 130, 180, 'Normal', 36);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (30, 'WBC', 5.9, 'x10⁹/L', 4, 11, 'Normal', 36);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (31, 'Platelets', 225, 'x10⁹/L', 150, 400, 'Normal', 36);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (32, 'ALT', 35, 'U/L', 7, 56, 'Normal', 41);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (33, 'AST', 30, 'U/L', 10, 40, 'Normal', 41);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (34, 'ALP', 115, 'U/L', 44, 147, 'Normal', 41);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (35, 'Total Cholesterol', 5.4, 'mmol/L', null, 5.2, 'High', 42);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (36, 'HDL', 1.5, 'mmol/L', 1, null, 'Normal', 42);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (37, 'LDL', 3.6, 'mmol/L', null, 3.4, 'High', 42);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (38, 'Triglycerides', 1.4, 'mmol/L', null, 1.7, 'Normal', 42);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (39, 'HbA1c', 5.3, '%', 4, 5.6, 'Normal', 43);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (40, '25(OH)D', 48, 'nmol/L', 50, null, 'Low', 44);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (41, 'Hemoglobin', 140, 'g/L', 130, 180, 'Normal', 45);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (42, 'WBC', 6.5, 'x10⁹/L', 4, 11, 'Normal', 45);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (43, 'Platelets', 230, 'x10⁹/L', 150, 400, 'Normal', 45);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (44, 'ALT', 31, 'U/L', 7, 56, 'Normal', 51);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (45, 'AST', 27, 'U/L', 10, 40, 'Normal', 51);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (46, 'ALP', 108, 'U/L', 44, 147, 'Normal', 51);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (47, 'Total Cholesterol', 6, 'mmol/L', null, 5.2, 'High', 52);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (48, 'HDL', 1.3, 'mmol/L', 1, null, 'Normal', 52);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (49, 'LDL', 4, 'mmol/L', null, 3.4, 'High', 52);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (50, 'Triglycerides', 1.6, 'mmol/L', null, 1.7, 'Normal', 52);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (51, 'HbA1c', 5.9, '%', 4, 5.6, 'Borderline', 53);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (52, 'Ferritin', 78, 'µg/L', 30, 400, 'Normal', 54);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (53, 'Serum Iron', 13, 'µmol/L', 10, 30, 'Normal', 54);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (54, 'TIBC', 60, 'µmol/L', 45, 70, 'Normal', 54);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (55, 'TSH', 2.4, 'mIU/L', 0.4, 4, 'Normal', 55);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (56, 'Free T4', 13.8, 'pmol/L', 9, 19, 'Normal', 55);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (57, 'Free T3', 4.5, 'pmol/L', 3.1, 6.8, 'Normal', 55);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (58, '25(OH)D', 46, 'nmol/L', 50, null, 'Low', 56);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (59, 'Hemoglobin', 136, 'g/L', 130, 180, 'Normal', 57);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (60, 'WBC', 6.1, 'x10⁹/L', 4, 11, 'Normal', 57);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (61, 'Platelets', 215, 'x10⁹/L', 150, 400, 'Normal', 57);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (62, 'ALT', 30, 'U/L', 7, 56, 'Normal', 61);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (63, 'AST', 26, 'U/L', 10, 40, 'Normal', 61);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (64, 'ALP', 112, 'U/L', 44, 147, 'Normal', 61);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (65, 'Total Cholesterol', 5.7, 'mmol/L', null, 5.2, 'High', 62);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (66, 'HDL', 1.4, 'mmol/L', 1, null, 'Normal', 62);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (67, 'LDL', 3.8, 'mmol/L', null, 3.4, 'High', 62);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (68, 'Triglycerides', 1.6, 'mmol/L', null, 1.7, 'Normal', 62);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (69, 'HbA1c', 5.7, '%', 4, 5.6, 'Borderline', 63);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (70, 'Ferritin', 90, 'µg/L', 30, 400, 'Normal', 64);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (71, 'Serum Iron', 15, 'µmol/L', 10, 30, 'Normal', 64);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (72, 'TIBC', 59, 'µmol/L', 45, 70, 'Normal', 64);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (73, '25(OH)D', 47, 'nmol/L', 50, null, 'Low', 65);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (74, 'Hemoglobin', 139, 'g/L', 130, 180, 'Normal', 66);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (75, 'WBC', 6.3, 'x10⁹/L', 4, 11, 'Normal', 66);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (76, 'Platelets', 220, 'x10⁹/L', 150, 400, 'Normal', 66);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (77, 'ALT', 33, 'U/L', 7, 56, 'Normal', 71);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (78, 'AST', 29, 'U/L', 10, 40, 'Normal', 71);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (79, 'ALP', 109, 'U/L', 44, 147, 'Normal', 71);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (80, 'Total Cholesterol', 5.8, 'mmol/L', null, 5.2, 'High', 72);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (81, 'HDL', 1.5, 'mmol/L', 1, null, 'Normal', 72);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (82, 'LDL', 3.7, 'mmol/L', null, 3.4, 'High', 72);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (83, 'Triglycerides', 1.6, 'mmol/L', null, 1.7, 'Normal', 72);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (84, 'HbA1c', 5.6, '%', 4, 5.6, 'Normal', 73);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (85, 'Ferritin', 88, 'µg/L', 30, 400, 'Normal', 74);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (86, 'Serum Iron', 16, 'µmol/L', 10, 30, 'Normal', 74);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (87, 'TIBC', 57, 'µmol/L', 45, 70, 'Normal', 74);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (88, '25(OH)D', 45, 'nmol/L', 50, null, 'Low', 75);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (89, 'Hemoglobin', 137, 'g/L', 130, 180, 'Normal', 76);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (90, 'WBC', 6.4, 'x10⁹/L', 4, 11, 'Normal', 76);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (91, 'Platelets', 218, 'x10⁹/L', 150, 400, 'Normal', 76);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (92, 'ALT', 34, 'U/L', 7, 56, 'Normal', 81);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (93, 'AST', 31, 'U/L', 10, 40, 'Normal', 81);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (94, 'ALP', 106, 'U/L', 44, 147, 'Normal', 81);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (95, 'Total Cholesterol', 6.1, 'mmol/L', null, 5.2, 'High', 82);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (96, 'HDL', 1.2, 'mmol/L', 1, null, 'Normal', 82);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (97, 'LDL', 4.2, 'mmol/L', null, 3.4, 'High', 82);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (98, 'Triglycerides', 1.7, 'mmol/L', null, 1.7, 'Normal', 82);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (99, 'HbA1c', 6, '%', 4, 5.6, 'High', 83);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (100, 'Ferritin', 82, 'µg/L', 30, 400, 'Normal', 84);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (101, 'Serum Iron', 12, 'µmol/L', 10, 30, 'Normal', 84);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (102, 'TIBC', 61, 'µmol/L', 45, 70, 'Normal', 84);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (103, 'TSH', 2.2, 'mIU/L', 0.4, 4, 'Normal', 85);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (104, 'Free T4', 14, 'pmol/L', 9, 19, 'Normal', 85);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (105, 'Free T3', 4.6, 'pmol/L', 3.1, 6.8, 'Normal', 85);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (106, '25(OH)D', 44, 'nmol/L', 50, null, 'Low', 86);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (107, 'Hemoglobin', 134, 'g/L', 130, 180, 'Normal', 87);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (108, 'WBC', 6, 'x10⁹/L', 4, 11, 'Normal', 87);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (109, 'Platelets', 212, 'x10⁹/L', 150, 400, 'Normal', 87);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (110, 'ALT', 28, 'U/L', 7, 56, 'Normal', 91);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (111, 'AST', 25, 'U/L', 10, 40, 'Normal', 91);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (112, 'ALP', 105, 'U/L', 44, 147, 'Normal', 91);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (113, 'Total Cholesterol', 5.3, 'mmol/L', null, 5.2, 'High', 92);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (114, 'HDL', 1.7, 'mmol/L', 1, null, 'Normal', 92);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (115, 'LDL', 3.5, 'mmol/L', null, 3.4, 'High', 92);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (116, 'Triglycerides', 1.3, 'mmol/L', null, 1.7, 'Normal', 92);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (117, 'HbA1c', 5.4, '%', 4, 5.6, 'Normal', 93);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (118, 'Hemoglobin', 141, 'g/L', 130, 180, 'Normal', 94);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (119, 'WBC', 6.6, 'x10⁹/L', 4, 11, 'Normal', 94);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (120, 'Platelets', 235, 'x10⁹/L', 150, 400, 'Normal', 94);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (121, 'ALT', 32, 'U/L', 7, 56, 'Normal', 101);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (122, 'AST', 30, 'U/L', 10, 40, 'Normal', 101);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (123, 'ALP', 111, 'U/L', 44, 147, 'Normal', 101);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (124, 'Total Cholesterol', 5.6, 'mmol/L', null, 5.2, 'High', 102);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (125, 'HDL', 1.5, 'mmol/L', 1, null, 'Normal', 102);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (126, 'LDL', 3.9, 'mmol/L', null, 3.4, 'High', 102);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (127, 'Triglycerides', 1.5, 'mmol/L', null, 1.7, 'Normal', 102);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (128, 'HbA1c', 5.8, '%', 4, 5.6, 'Borderline', 103);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (129, 'Ferritin', 86, 'µg/L', 30, 400, 'Normal', 104);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (130, 'Serum Iron', 15, 'µmol/L', 10, 30, 'Normal', 104);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (131, 'TIBC', 58, 'µmol/L', 45, 70, 'Normal', 104);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (132, '25(OH)D', 43, 'nmol/L', 50, null, 'Low', 105);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (133, 'Hemoglobin', 138, 'g/L', 130, 180, 'Normal', 106);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (134, 'WBC', 6.2, 'x10⁹/L', 4, 11, 'Normal', 106);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (135, 'Platelets', 222, 'x10⁹/L', 150, 400, 'Normal', 106);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (136, 'ALT', 30, 'U/L', 7, 56, 'Normal', 111);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (137, 'AST', 28, 'U/L', 10, 40, 'Normal', 111);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (138, 'ALP', 107, 'U/L', 44, 147, 'Normal', 111);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (139, 'Total Cholesterol', 5.5, 'mmol/L', null, 5.2, 'High', 112);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (140, 'HDL', 1.6, 'mmol/L', 1, null, 'Normal', 112);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (141, 'LDL', 3.6, 'mmol/L', null, 3.4, 'High', 112);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (142, 'Triglycerides', 1.4, 'mmol/L', null, 1.7, 'Normal', 112);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (143, 'HbA1c', 5.5, '%', 4, 5.6, 'Normal', 113);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (144, '25(OH)D', 46, 'nmol/L', 50, null, 'Low', 114);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (145, 'Hemoglobin', 140, 'g/L', 130, 180, 'Normal', 115);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (146, 'WBC', 6.3, 'x10⁹/L', 4, 11, 'Normal', 115);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (147, 'Platelets', 228, 'x10⁹/L', 150, 400, 'Normal', 115);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (148, 'ALT', 31, 'U/L', 7, 56, 'Normal', 121);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (149, 'AST', 27, 'U/L', 10, 40, 'Normal', 121);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (150, 'ALP', 110, 'U/L', 44, 147, 'Normal', 121);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (151, 'Total Cholesterol', 5.9, 'mmol/L', null, 5.2, 'High', 122);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (152, 'HDL', 1.4, 'mmol/L', 1, null, 'Normal', 122);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (153, 'LDL', 3.8, 'mmol/L', null, 3.4, 'High', 122);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (154, 'Triglycerides', 1.5, 'mmol/L', null, 1.7, 'Normal', 122);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (155, 'HbA1c', 5.7, '%', 4, 5.6, 'Borderline', 123);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (156, 'Ferritin', 92, 'µg/L', 30, 400, 'Normal', 124);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (157, 'Serum Iron', 14, 'µmol/L', 10, 30, 'Normal', 124);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (158, 'TIBC', 60, 'µmol/L', 45, 70, 'Normal', 124);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (159, '25(OH)D', 46, 'nmol/L', 50, null, 'Low', 125);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (160, 'Hemoglobin', 139, 'g/L', 130, 180, 'Normal', 126);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (161, 'WBC', 6.4, 'x10⁹/L', 4, 11, 'Normal', 126);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (162, 'Platelets', 221, 'x10⁹/L', 150, 400, 'Normal', 126);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (163, 'ALT', 29, 'U/L', 7, 56, 'Normal', 131);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (164, 'AST', 26, 'U/L', 10, 40, 'Normal', 131);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (165, 'ALP', 113, 'U/L', 44, 147, 'Normal', 131);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (166, 'Total Cholesterol', 5.5, 'mmol/L', null, 5.2, 'High', 132);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (167, 'HDL', 1.6, 'mmol/L', 1, null, 'Normal', 132);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (168, 'LDL', 3.7, 'mmol/L', null, 3.4, 'High', 132);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (169, 'Triglycerides', 1.5, 'mmol/L', null, 1.7, 'Normal', 132);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (170, 'HbA1c', 5.6, '%', 4, 5.6, 'Normal', 133);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (171, '25(OH)D', 45, 'nmol/L', 50, null, 'Low', 134);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (172, 'Hemoglobin', 137, 'g/L', 130, 180, 'Normal', 135);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (173, 'WBC', 6.2, 'x10⁹/L', 4, 11, 'Normal', 135);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (174, 'Platelets', 224, 'x10⁹/L', 150, 400, 'Normal', 135);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (175, 'ALT', 30, 'U/L', 7, 56, 'Normal', 141);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (176, 'AST', 27, 'U/L', 10, 40, 'Normal', 141);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (177, 'ALP', 109, 'U/L', 44, 147, 'Normal', 141);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (178, 'Total Cholesterol', 5.4, 'mmol/L', null, 5.2, 'High', 142);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (179, 'HDL', 1.6, 'mmol/L', 1, null, 'Normal', 142);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (180, 'LDL', 3.6, 'mmol/L', null, 3.4, 'High', 142);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (181, 'Triglycerides', 1.4, 'mmol/L', null, 1.7, 'Normal', 142);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (182, 'HbA1c', 5.5, '%', 4, 5.6, 'Normal', 143);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (183, '25(OH)D', 44, 'nmol/L', 50, null, 'Low', 144);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (184, 'Hemoglobin', 140, 'g/L', 130, 180, 'Normal', 145);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (185, 'WBC', 6.3, 'x10⁹/L', 4, 11, 'Normal', 145);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (186, 'Platelets', 226, 'x10⁹/L', 150, 400, 'Normal', 145);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (187, 'ALT', 31, 'U/L', 7, 56, 'Normal', 151);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (188, 'AST', 29, 'U/L', 10, 40, 'Normal', 151);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (189, 'ALP', 108, 'U/L', 44, 147, 'Normal', 151);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (190, 'Total Cholesterol', 5.6, 'mmol/L', null, 5.2, 'High', 152);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (191, 'HDL', 1.5, 'mmol/L', 1, null, 'Normal', 152);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (192, 'LDL', 3.7, 'mmol/L', null, 3.4, 'High', 152);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (193, 'Triglycerides', 1.5, 'mmol/L', null, 1.7, 'Normal', 152);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (194, 'HbA1c', 5.6, '%', 4, 5.6, 'Normal', 153);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (195, '25(OH)D', 45, 'nmol/L', 50, null, 'Low', 154);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (196, 'Hemoglobin', 138, 'g/L', 130, 180, 'Normal', 155);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (197, 'WBC', 6.4, 'x10⁹/L', 4, 11, 'Normal', 155);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (198, 'Platelets', 229, 'x10⁹/L', 150, 400, 'Normal', 155);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (199, 'ALT', 32, 'U/L', 7, 56, 'Normal', 161);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (200, 'AST', 30, 'U/L', 10, 40, 'Normal', 161);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (201, 'ALP', 110, 'U/L', 44, 147, 'Normal', 161);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (202, 'Total Cholesterol', 5.7, 'mmol/L', null, 5.2, 'High', 162);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (203, 'HDL', 1.5, 'mmol/L', 1, null, 'Normal', 162);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (204, 'LDL', 3.8, 'mmol/L', null, 3.4, 'High', 162);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (205, 'Triglycerides', 1.6, 'mmol/L', null, 1.7, 'Normal', 162);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (206, 'HbA1c', 5.7, '%', 4, 5.6, 'Borderline', 163);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (207, 'Ferritin', 89, 'µg/L', 30, 400, 'Normal', 164);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (208, 'Serum Iron', 14, 'µmol/L', 10, 30, 'Normal', 164);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (209, 'TIBC', 59, 'µmol/L', 45, 70, 'Normal', 164);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (210, '25(OH)D', 45, 'nmol/L', 50, null, 'Low', 165);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (211, 'Hemoglobin', 139, 'g/L', 130, 180, 'Normal', 166);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (212, 'WBC', 6.4, 'x10⁹/L', 4, 11, 'Normal', 166);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (213, 'Platelets', 220, 'x10⁹/L', 150, 400, 'Normal', 166);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (214, 'ALT', 33, 'U/L', 7, 56, 'Normal', 171);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (215, 'AST', 30, 'U/L', 10, 40, 'Normal', 171);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (216, 'ALP', 109, 'U/L', 44, 147, 'Normal', 171);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (217, 'Total Cholesterol', 6, 'mmol/L', null, 5.2, 'High', 172);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (218, 'HDL', 1.4, 'mmol/L', 1, null, 'Normal', 172);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (219, 'LDL', 4, 'mmol/L', null, 3.4, 'High', 172);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (220, 'Triglycerides', 1.6, 'mmol/L', null, 1.7, 'Normal', 172);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (221, 'HbA1c', 5.9, '%', 4, 5.6, 'Borderline', 173);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (222, 'Ferritin', 84, 'µg/L', 30, 400, 'Normal', 174);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (223, 'Serum Iron', 13, 'µmol/L', 10, 30, 'Normal', 174);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (224, 'TIBC', 58, 'µmol/L', 45, 70, 'Normal', 174);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (225, 'TSH', 2.3, 'mIU/L', 0.4, 4, 'Normal', 175);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (226, 'Free T4', 14.1, 'pmol/L', 9, 19, 'Normal', 175);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (227, 'Free T3', 4.7, 'pmol/L', 3.1, 6.8, 'Normal', 175);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (228, '25(OH)D', 44, 'nmol/L', 50, null, 'Low', 176);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (229, 'Hemoglobin', 137, 'g/L', 130, 180, 'Normal', 177);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (230, 'WBC', 6.3, 'x10⁹/L', 4, 11, 'Normal', 177);
INSERT INTO public.results (id, parameter, value, unit, reference_range_low, reference_range_high, status, blood_test_id) VALUES (231, 'Platelets', 225, 'x10⁹/L', 150, 400, 'Normal', 177);

