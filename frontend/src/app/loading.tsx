export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-900 border-t-transparent" />
        <p className="text-sm text-neutral-600">Carregando aplicação...</p>
      </div>
    </main>
  );
}
