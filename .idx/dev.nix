{ pkgs, ... }: {
  # To learn more about how to use Nix to configure your environment
  # see: https://firebase.google.com/docs/studio/customize-workspace

  # Which nixpkgs channel to use.
  channel = "stable-24.11"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.zulu
  ];

  # Sets environment variables in the workspace
  env = {};

  # This adds a file watcher to startup the firebase emulators. The emulator
  # configuration is read from the firebase.json file in the user's directory.
  services.firebase.emulators = {
    detect = true;
    projectId = "aplumbingelectrics";
    services = [ "auth" "firebase" ];
  };

  # Search for the extensions you want on https://open-vsx.org/ and add them here.
  idx.extensions = [
    # "vscodevim.vim"
  ];
}
