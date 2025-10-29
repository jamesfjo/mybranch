# How to Launch GitHub Codespaces for VSL Market

## Finding the Code Button

The **"Code"** button is located on the main GitHub repository page. Here's how to find it:

### Step-by-Step Instructions:

1. **Go to your repository on GitHub**
   - Navigate to: `https://github.com/jamesfjo/mybranch`
   - Make sure you're logged into your GitHub account

2. **Locate the Code Button**
   - The green **"Code"** button is at the top-right of the file list
   - It's next to the "Add file" and "Go to file" buttons
   - Look just above the list of files (like README.md, index.html, etc.)

3. **Click the Code Button**
   - Click the green **"Code"** button
   - A dropdown menu will appear with three tabs at the top:
     - **Local** (shows clone URLs)
     - **Codespaces** ← Click this tab!
     - **SSH**

4. **Open the Codespaces Tab**
   - Click on the **"Codespaces"** tab in the dropdown
   - You'll see a button that says **"Create codespace on [branch-name]"**

5. **Create Your Codespace**
   - Click the **"Create codespace on..."** button
   - GitHub will start building your development environment (takes 2-3 minutes first time)
   - A new browser tab will open with VS Code running in your browser

## Alternative: Direct Link

You can also use this direct link to create a codespace:
```
https://codespaces.new/jamesfjo/mybranch?quickstart=1
```

Or create from this specific branch:
```
https://github.com/jamesfjo/mybranch/codespaces/new?branch=copilot/build-website-for-vsl-market
```

## Troubleshooting

### "I don't see a Codespaces tab"
- Make sure you're logged into GitHub with an account that has access to this repository
- GitHub Codespaces requires a GitHub account (free tier includes 120 core-hours/month)
- If you're on a free account, ensure you haven't exceeded your monthly limit

### "The Code button isn't green"
- The button might be blue or gray depending on your GitHub theme
- Look for the button labeled "Code" regardless of color
- It's always in the same location: top-right area above the file list

### "I see 'Get started with GitHub Codespaces'"
- This means you haven't used Codespaces before
- Click through the introduction/tutorial
- Then you'll be able to create your codespace

## Once Your Codespace is Running

After your codespace loads (you'll see VS Code in your browser):

1. **Open the Terminal** (if not already open):
   - Look at the bottom panel
   - Or use menu: Terminal → New Terminal
   - Or press: `` Ctrl+` `` (backtick key)

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **View your website**:
   - A notification will appear: "Your application running on port 3000 is available"
   - Click "Open in Browser"
   - Your website will open in a new tab!

4. **Make changes**:
   - Edit any file (HTML, CSS, JS)
   - Save (Ctrl+S or Cmd+S)
   - The browser will automatically reload with your changes!

## Need More Help?

If you still can't find the Code button:
1. Take a screenshot of your GitHub repository page
2. Share it in the PR comments
3. I can provide more specific guidance based on what you're seeing

The Code button is a standard GitHub feature, so it should be there. If you're viewing this repository on GitHub.com while logged in, you'll definitely see it!
