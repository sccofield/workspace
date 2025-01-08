export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} Matriks Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
