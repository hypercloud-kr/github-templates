# github-templates
하이퍼클라우드 깃허브 템플릿

각 templates 하위에 있는 파일들을 복사하여 프로젝트 루트 디렉토리에 붙여넣습니다.

## 사용법
**NPMRC 설정**
```bash
echo "//npm.pkg.github.com/:_authToken=\${PACKAGE_TOKEN}" > .npmrc
echo "@hypercloud-kr:registry=https://npm.pkg.github.com/" >> .npmrc
echo "always-auth=true" >> .npmrc
```

**패키지 설치**
```bash
yarn add -D @hypercloud-kr/github-templates
```

**프로젝트 루트 디렉토리에서 실행**
```bash
npx hc-github-templates frontend|backend|webxr
```