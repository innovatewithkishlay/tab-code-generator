const Footer = () => {
  const dateStr = new Date().toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <footer className="fixed bottom-0 left-0 right-0 p-4 text-center border-t border-gray-800 dark:border-gray-200 bg-white dark:bg-gray-900 text-black dark:text-white">
      © {dateStr} Rohan Khurana, 21358295
    </footer>
  );
};

export default Footer;
