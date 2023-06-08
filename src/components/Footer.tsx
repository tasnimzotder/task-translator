import Link from 'next/link';

const Author = () => {
  const author_url = 'https://tasnimzotder.com';

  return <Link href={author_url}>Tasnim Zotder</Link>;
};

const Footer = () => {
  const start_year = 2023;
  const current_year = new Date().getFullYear();

  let year_str = '';

  if (start_year === current_year) {
    year_str = `${start_year}`;
  } else {
    year_str = `${start_year} - ${current_year}`;
  }

  return (
    <footer className="text-center">
      &copy; {year_str} <Author />
    </footer>
  );
};

export default Footer;
