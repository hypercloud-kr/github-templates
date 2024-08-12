import { promises as fs } from 'fs';
import path from 'path';

const copyDirectoryRecursive = async (sourceDir: string, targetDir: string) => {
	const entries = await fs.readdir(sourceDir, { withFileTypes: true });

	for (const entry of entries) {
		const sourcePath = path.join(sourceDir, entry.name);
		const targetPath = path.join(targetDir, entry.name);

		if (entry.isDirectory()) {
			await fs.mkdir(targetPath, { recursive: true });
			await copyDirectoryRecursive(sourcePath, targetPath);
		} else {
			await fs.copyFile(sourcePath, targetPath);
			console.log(`${sourcePath} 파일이 ${targetPath}로 복사되었습니다.`);
		}
	}
};

const copyTemplateFiles = async (templateType: string, targetDir: string) => {
	const templateDir = path.join(__dirname, 'templates', templateType);
	const githubDir = path.join(targetDir, '.github');
	console.log(templateDir, githubDir);
	await fs.mkdir(githubDir, { recursive: true });
	await copyDirectoryRecursive(templateDir, githubDir);
};

const run = async () => {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		console.error('사용법: npx setting-repository frontend|backend|webxr');
		process.exit(1);
	}

	const templateType = args[0];
	const targetDir = process.cwd();

	try {
		await copyTemplateFiles(templateType, targetDir);
	} catch (err) {
		console.error('오류가 발생했습니다:', err);
		process.exit(1);
	}
};

run();
