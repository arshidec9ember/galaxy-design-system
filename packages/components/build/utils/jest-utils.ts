import path from 'path'
import { readdirSync, statSync } from 'fs'

function getDirectories (path: string): string[] {
  return readdirSync(path).filter(function (file: string) {
    return statSync(`${path}/${file}`).isDirectory()
  })
}

const srcPath = path.resolve(__dirname, '../../src')

const componentsInFolder: string[] = getDirectories(srcPath)

const getServerTestCaseFile = (componentFolder: string): string =>
  `<rootDir>/src/${componentFolder}/**/*/server.spec.tsx`

export const componentsFlag = (failingComponents: string[]): string[] => {
  // remove failing components from componentsInFolder
  return componentsInFolder
    .filter((component) => {
      return !failingComponents.includes(component)
    })
    .map(getServerTestCaseFile)
}
