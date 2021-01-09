//uppercase bank bame
export const upperCaseBankName = (name) => {
  //separate word
  const arrayName = name.split(' ');

  const newArrayName = arrayName.map((dataName) => {
    if (dataName.length <= 4) {
      //uppercase all leter
      return dataName.toUpperCase();
    } else {
      //uppercase first letter
      return dataName.charAt(0).toUpperCase() + dataName.slice(1);
    }
  });
  // join word
  return newArrayName.join(' ');
};

export const convertToRupiah = (nominal) => {
  let rupiah = '';
  //reverse nominal
  const nominalReverse = nominal.toString().split('').reverse().join('');
  for (let i = 0; i < nominalReverse.length; i++) {
    //get 3 letter and add dot
    if (i % 3 === 0) {
      rupiah += nominalReverse.substr(i, 3) + '.';
    }
  }
  return (
    // add Rp, remove dot in front, and reverse
    'Rp' +
    rupiah
      .split('', rupiah.length - 1)
      .reverse()
      .join('')
  );
};

//month list
const monthNames = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export const dateFormat = (date) => {
  //get only date
  const time = new Date(date.replace(' ', 'T'));
  return (
    //date numeric
    time.getDate() +
    ' ' +
    //month long
    monthNames[time.getMonth()] +
    ' ' +
    //year numeric
    time.getFullYear()
  );
};

//to miliseconds for compare date
export const convertTomiliseconds = (date) => {
  return new Date(date.replace(' ', 'T'));
};

export const aToZ = (data) => {
  return [...data].sort((a, b) =>
    a.beneficiary_name
      .toLowerCase()
      .localeCompare(b.beneficiary_name.toLowerCase()),
  );
};

export const zToA = (data) => {
  return [...data].sort((a, b) =>
    b.beneficiary_name
      .toLowerCase()
      .localeCompare(a.beneficiary_name.toLowerCase()),
  );
};

export const latestDate = (data) => {
  return [...data].sort(
    (a, b) =>
      convertTomiliseconds(b.created_at) - convertTomiliseconds(a.created_at),
  );
};

export const earliestDate = (data) => {
  return [...data].sort(
    (a, b) =>
      convertTomiliseconds(a.created_at) - convertTomiliseconds(b.created_at),
  );
};

export const searchFilter = (data, searchValue) => {
  return (
    data.beneficiary_name.toLowerCase().includes(searchValue.toLowerCase()) ||
    data.sender_bank.toLowerCase().includes(searchValue.toLowerCase()) ||
    data.beneficiary_bank.toLowerCase().includes(searchValue.toLowerCase()) ||
    data.amount.toString().includes(searchValue)
  );
};
