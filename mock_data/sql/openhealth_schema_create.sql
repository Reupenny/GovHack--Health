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