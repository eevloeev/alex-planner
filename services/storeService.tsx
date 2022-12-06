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
  getStoreList()
  return JSON.parse(data)
}

export async function writeStore(name: String, data: Object) {
  const path = getStorePath(name)
  await fs.writeFileSync(path, JSON.stringify(data))
}

export async function getStoreList() {
  const dir = path.join(process.cwd(), `store`)
  const list: Array<String> = []
  fs.readdirSync(dir).forEach((file) => {
    const name = file.replace(".json", "")
    list.push(name)
  })
  return list
}
