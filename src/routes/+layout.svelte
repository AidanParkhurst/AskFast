<script>
    import { inject } from '@vercel/analytics'

    let title = 'AskFast';

    inject();
</script>

<title>{title}</title>
<slot></slot>

<style>
    :root {
        font-family: 'Inter', sans-serif;
        --color-light: #f5f5f5;
        --color-mid: #999;
        --color-dark: #333;
        --color-border: #ddd;
        --color-success: #28a745;
        --color-danger: #dc3545;
        --color-highlight: #ffc107;
        --color-info: #17a2b8;

        --reasonable-width: 70%;
    }

    @media (max-width: 700px) {
        :root {
            --reasonable-width: 90%;
        }
    }
</style>