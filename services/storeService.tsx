import path from "path"
import fs from "fs"

function getStorePath(name: String) {
  return path.join(process.cwd(), `store/${name}.json`)
}

export async function getStore(name: String) {
  const path = getStorePath(name)

  const isExists = await fs.existsSync(path)
  if (!isExists) {
    return null
  }

  const data = await fs.readFileSync(path, "utf8")
  return JSON.parse(data)
}

export async function writeStore(name: String, data: Object) {
  const path = getStorePath(name)
  await fs.writeFileSync(path, JSON.stringify(data))
}
