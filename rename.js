const fs = require("fs");
const path = require("path");

// 要重命名和移动的根目录
const rootDir = path.join(__dirname, "src");
const newRootDir = path.join(__dirname, "src-new");

// 首字母大写转换为小写，并用 '-' 替换大写字母
function toKebabCase(str) {
  return str
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");
}

// 遍历目录并重命名和移动文件
function renameAndMoveFiles(dir, newDir) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error("读取目录出错:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        const newSubDirName = toKebabCase(file);
        const newSubDirPath = path.join(newDir, newSubDirName);

        // 创建新的子目录
        if (!fs.existsSync(newSubDirPath)) {
          fs.mkdirSync(newSubDirPath);
        }

        // 递归处理子目录
        renameAndMoveFiles(filePath, newSubDirPath);
      } else {
        const newFileName = toKebabCase(file);
        const newFilePath = path.join(newDir, newFileName);

        // 重命名并移动文件
        fs.rename(filePath, newFilePath, (err) => {
          if (err) {
            console.error("重命名文件出错:", err);
          } else {
            console.log(`重命名并移动: ${filePath} -> ${newFilePath}`);
          }
        });
      }
    });

    // 删除旧目录（如果目录是空的）
    fs.rmdir(dir, (err) => {
      if (err && err.code !== "ENOTEMPTY") {
        console.error("删除目录出错:", err);
      }
    });
  });
}

// 创建 src-new 目录（如果不存在）
if (!fs.existsSync(newRootDir)) {
  fs.mkdirSync(newRootDir);
}

// 开始重命名和移动文件
renameAndMoveFiles(rootDir, newRootDir);
