### Step {{ step_number }} 점검 결과

| 점검 항목 | 상태 |
|---------|------|
{{ range results_table -}}
| {{ .description }} | {{ if .passed }}✅ 완료{{ else }}❌ 미완료{{ end }} |
{{ end }}

