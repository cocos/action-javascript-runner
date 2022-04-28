# Javascript Runner

在 action 里运行一个 nodejs 脚本，等待 nodejs 脚本结束。

## Inputs

### `script`

**Required** 需要执行的 nodejs 脚本地址

## Outputs

### `time`

执行所花费的时间

## Example usage

```yaml
uses: VisualSJ/action-javascript-runner@v1.1
with:
  script: './workflow/init.js'
  args: '--checkout=hard'
env:
  GITHUB_PULL_REQUEST_BODY: ${{ github.event.pull_request.body }}
```
