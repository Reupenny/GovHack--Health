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