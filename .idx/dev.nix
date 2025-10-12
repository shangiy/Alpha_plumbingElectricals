{ pkgs, ... }: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
  ];
  previews = [
    {
      command = [
        "npm"
        "run"
        "dev"
        "--"
        "--port"
        "$PORT"
        "--hostname"
        "0.0.0.0"
      ];
      manager = "web";
    }
  ];
}
