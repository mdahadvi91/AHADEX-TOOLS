export default function handler(
  _req: unknown,
  res: { status: (code: number) => { json: (body: Record<string, unknown>) => void } }
) {
  res.status(200).json({
    status: 'ok',
    service: 'ahadex-tools',
    timestamp: new Date().toISOString(),
  });
}
