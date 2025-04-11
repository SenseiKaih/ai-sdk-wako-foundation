import NextLink from "next/link";
export const ProjectOverview = () => {
  return (
    <div className="flex flex-col items-center justify-end">
      <h1 className="text-3xl font-semibold mb-4">Prince Wako Foundation Chatbot</h1>
      <p className="text-center max-w-xl">
        Welcome to the Prince Wako Foundation’s AI Chatbot! This assistant
        helps you explore our initiatives, generate content, and learn more about our
        mission to support communities with better access to clean water, education, and
        opportunity.
      </p>
    </div>
  );
};
const Link = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <NextLink
      target="_blank"
      className="text-blue-500 hover:text-blue-600 transition-colors duration-75"
      href={href}
    >
      {children}
    </NextLink>
  );
};
